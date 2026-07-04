import { NextResponse } from "next/server";

import { clearAdminSession } from "@/lib/admin-session-server";

export async function POST() {
  clearAdminSession();
  return NextResponse.json({ success: true });
}