import Link from "next/link";
import { Search } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { leadSourceLabel, leadStatusBadgeVariant, leadStatusLabel } from "@/lib/admin-display";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  q?: string;
  status?: string;
  source?: string;
  sort?: string;
  page?: string;
}>;

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function toQueryString(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  return query.toString();
}

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = params.status?.trim() ?? "";
  const source = params.source?.trim() ?? "";
  const sort = params.sort === "oldest" ? "oldest" : "newest";
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const pageSize = 10;

  const where: Prisma.LeadWhereInput = {
    AND: [
      q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { phone: { contains: q, mode: "insensitive" } },
              { company: { contains: q, mode: "insensitive" } },
              { service: { contains: q, mode: "insensitive" } },
              { message: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      status
        ? {
            status: status as Prisma.EnumLeadStatusFilter["equals"],
          }
        : {},
      source
        ? {
            source: source as Prisma.EnumLeadSourceFilter["equals"],
          }
        : {},
    ],
  };

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow">Leads</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Lead pipeline
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto]" method="get">
            <div className="relative lg:col-span-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Search leads"
                className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              className="h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CLOSED">Closed</option>
            </select>

            <select
              name="source"
              defaultValue={source}
              className="h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All sources</option>
              <option value="HOMEPAGE_POPUP">Homepage Popup</option>
              <option value="CONTACT_PAGE">Contact Page</option>
              <option value="SERVICE_PAGE">Service Page</option>
            </select>

            <select
              name="sort"
              defaultValue={sort}
              className="h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>

            <div className="flex gap-2">
              <Button type="submit">Apply</Button>
              <Button asChild variant="outline" type="button">
                <Link href="/admin/leads">Reset</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border px-6 py-4 text-sm text-muted-foreground">
            Showing {leads.length} of {total} leads
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium text-secondary hover:text-primary"
                    >
                      {lead.name}
                    </Link>
                  </TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>{leadSourceLabel(lead.source)}</TableCell>
                  <TableCell>
                    <Badge variant={leadStatusBadgeVariant(lead.status)}>
                      {leadStatusLabel(lead.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(lead.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <Link
              href={`/admin/leads?${toQueryString({
                q,
                status,
                source,
                sort,
                page: page - 1,
              })}`}
            >
              Previous
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            disabled={page >= totalPages}
            className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
          >
            <Link
              href={`/admin/leads?${toQueryString({
                q,
                status,
                source,
                sort,
                page: page + 1,
              })}`}
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}