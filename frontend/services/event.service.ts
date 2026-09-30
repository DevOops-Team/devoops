// services/event.service.ts

import { createEvent, findEvents } from "@/repositories/event.repository";

export async function logEvent(
  actor: string,
  action: string,
  target?: string,
  detail?: string,
) {
  return createEvent({ actor, action, target, detail, createdAt: new Date() });
}

export async function getEvents(limit = 100, username?: string) {
  return findEvents(username, limit);
}
