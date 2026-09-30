import { getCurrentUser } from "@/lib/auth/session";
import { desktopBackend } from "@/lib/openstack/desktop";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    desktopId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { desktopId } = await params;
  const user = await getCurrentUser();

  const desktop = await desktopBackend.status(desktopId);

  if (!desktop) {
    return NextResponse.json({ message: "Desktop not found" }, { status: 404 });
  }

  // owner 검증
  if (desktop.owner !== user.username) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(desktop);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { desktopId } = await params;

  const user = await getCurrentUser();

  // 조회 + 소유자 확인
  const desktop = await desktopBackend.status(desktopId);

  if (!desktop) {
    return NextResponse.json({ message: "Desktop not found" }, { status: 404 });
  }

  if (desktop.owner !== user.username) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await desktopBackend.delete(desktop.instanceId);

  return NextResponse.json({
    id: desktopId,
    status: "DELETING",
  });
}
