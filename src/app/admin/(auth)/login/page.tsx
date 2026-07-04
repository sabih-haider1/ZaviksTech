import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { getAdminSession } from "@/lib/admin-session-server";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/layout/logo";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <span className="eyebrow mx-auto w-fit">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Admin access
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-secondary">
          Sign in to the dashboard
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Admin access is restricted to the ZaviksTech team only.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}