import { getCurrentUser } from "@/lib/auth/session";
import { createGuacamoleData } from "@/lib/guacamole/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ desktopId: string }>;
  },
) {
  const { desktopId } = await params;

  const user = await getCurrentUser();

  // DB/OpenStack에서 Desktop 조회
  // owner 확인
  // READY 확인

  const data = createGuacamoleData(user.username, {
    id: desktopId,
    floatingIp: "예시 Floating IP",
  });

  const encoded = encodeURIComponent(JSON.stringify(data));

  return NextResponse.json({
    url: `${process.env.GUAC_URL}?data=${encoded}`,
  });
}
