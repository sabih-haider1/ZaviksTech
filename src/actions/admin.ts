"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session-server";
import { leadUpdateSchema } from "@/lib/validations/admin";

export interface AdminActionResult {
  success: boolean;
  message: string;
}

export async function updateLeadDetails(
  formData: FormData,
): Promise<void> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const parsed = leadUpdateSchema.safeParse({
    leadId: String(formData.get("leadId") ?? ""),
    status: String(formData.get("status") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  await prisma.lead.update({
    where: { id: parsed.data.leadId },
    data: {
      status: parsed.data.status,
      notes: parsed.data.notes?.trim() ? parsed.data.notes.trim() : null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
}