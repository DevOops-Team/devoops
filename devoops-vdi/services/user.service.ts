import { createEvent } from "@/repositories/event.repository";

import {
  createUserIfNotExists,
  loginUser,
} from "@/repositories/user.repository";

const DEFAULT_QUOTA = Number(process.env.VDI_QUOTA_PER_USER ?? 2);

export async function login(username: string) {
  await createUserIfNotExists(username, DEFAULT_QUOTA);

  const user = await loginUser(username);

  if (!user) {
    return null;
  }

  await createEvent({
    actor: username,
    action: "login",
    createdAt: new Date(),
  });

  return user;
}
