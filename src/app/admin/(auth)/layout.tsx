export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-muted/40 to-background px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}