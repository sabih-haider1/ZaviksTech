import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { adminLoginSchema } from "@/lib/validations/admin";
import { setAdminSession } from "@/lib/admin-session-server";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { success } = rateLimit(`admin-login:${ip}`, 10, 15 * 60_000);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please enter valid credentials." },
      { status: 400 },
    );
  }

  const admin = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  const passwordMatches =
    admin && (await bcrypt.compare(parsed.data.password, admin.passwordHash));

  if (!passwordMatches) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password." },
      { status: 401 },
    );
  }

  await setAdminSession({
    userId: admin.id,
    email: admin.email,
    name: admin.name,
  });

  return NextResponse.json({ success: true });
}