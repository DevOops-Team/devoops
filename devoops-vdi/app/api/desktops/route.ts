import { getCurrentUser } from "@/lib/auth/session";
import { desktopBackend } from "@/lib/openstack/desktop";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  const body = await request.json();

  if (!body.os) {
    return NextResponse.json({ message: "OS is required" }, { status: 400 });
  }

  const desktopId = crypto.randomUUID();

  const desktop = await desktopBackend.create(
    desktopId,
    user.username,
    body.os,
  );

  return NextResponse.json(desktop, {
    status: 202,
  });
}
