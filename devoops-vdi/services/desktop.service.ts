// services/desktop.service.ts

import { createDesktop } from "@/repositories/desktop.repository";
import { findUser } from "@/repositories/user.repository";
import { logEvent } from "@/services/event.service";

export async function createUserDesktop(username: string, os: string) {
  const user = await findUser(username);

  if (!user) {
    throw new Error("User not found");
  }

  // quota 확인
  // 현재 생성된 desktop 개수 확인
  // Kubernetes/OpenStack에 desktop 생성
  const desktop = await createDesktop(username, os);

  await logEvent(username, "desktop.create", username, `${desktop.id} ${os}`);

  return desktop;
}
