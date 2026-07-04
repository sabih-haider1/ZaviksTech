import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Users } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { leadSourceLabel, leadStatusBadgeVariant, leadStatusLabel } from "@/lib/admin-display";
import { siteConfig } from "@/lib/site";
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

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalLeads, todayLeads, monthLeads, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Lead overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Monitor new enquiries, track response progress and move qualified
            prospects through the pipeline.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/leads">
            View all leads
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Total Leads",
            value: totalLeads,
            icon: Users,
          },
          {
            title: "Today's Leads",
            value: todayLeads,
            icon: CalendarDays,
          },
          {
            title: "This Month",
            value: monthLeads,
            icon: Mail,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-secondary">
                      {card.value}
                    </p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold text-secondary">
              Recent leads
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
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

      <div className="rounded-lg border border-border bg-background p-6 text-sm text-muted-foreground">
        <p>
          Public contact details on the site use {siteConfig.phone} and {siteConfig.email}.
        </p>
      </div>
    </div>
  );
}