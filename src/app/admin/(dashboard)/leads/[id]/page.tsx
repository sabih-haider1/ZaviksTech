import { notFound } from "next/navigation";
import { Mail, Phone, User2 } from "lucide-react";

import { updateLeadDetails } from "@/actions/admin";
import { leadSourceLabel, leadStatusBadgeVariant, leadStatusLabel } from "@/lib/admin-display";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });

  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Lead detail</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              {lead.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Submitted {formatDate(lead.createdAt)}
            </p>
          </div>
          <Badge variant={leadStatusBadgeVariant(lead.status)}>
            {leadStatusLabel(lead.status)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <User2 className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{lead.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <a className="hover:text-primary" href={`mailto:${lead.email}`}>
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <a className="hover:text-primary" href={`tel:${lead.phone.replace(/\s+/g, "")}`}>
                  {lead.phone}
                </a>
              </div>
              {lead.company && <p><span className="font-medium text-secondary">Company:</span> {lead.company}</p>}
              <p><span className="font-medium text-secondary">Service:</span> {lead.service}</p>
              <p><span className="font-medium text-secondary">Source:</span> {leadSourceLabel(lead.source)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.message ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {lead.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No message provided.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update lead</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateLeadDetails} className="space-y-5">
              <input type="hidden" name="leadId" value={lead.id} />

              <div>
                <Label htmlFor="lead-status">Status</Label>
                <select
                  id="lead-status"
                  name="status"
                  defaultValue={lead.status}
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <div>
                <Label htmlFor="lead-notes">Notes</Label>
                <Textarea
                  id="lead-notes"
                  name="notes"
                  defaultValue={lead.notes ?? ""}
                  rows={8}
                  className="mt-1.5"
                  placeholder="Add private follow-up notes here"
                />
              </div>

              <Button type="submit">Save updates</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <p className="font-medium text-secondary">Created</p>
            <p className="mt-1 text-muted-foreground">{formatDate(lead.createdAt)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <p className="font-medium text-secondary">Updated</p>
            <p className="mt-1 text-muted-foreground">{formatDate(lead.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}