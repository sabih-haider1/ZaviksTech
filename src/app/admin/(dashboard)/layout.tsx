import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/admin-session-server";
import { Logo } from "@/components/layout/logo";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-muted/20">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/admin" className="inline-flex items-center gap-3">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-secondary md:flex">
            <Link href="/admin" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/admin/leads" className="hover:text-primary">
              Leads
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {session.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container py-8 sm:py-10">{children}</main>
    </div>
  );
}