import clientPromise from "@/lib/db/db";
import { Event } from "@/types/event";

async function getEventsCollection() {
  const client = await clientPromise;

  return client.db(process.env.MONGODB_DB).collection<Event>("events");
}

export async function createEvent(event: Event) {
  const events = await getEventsCollection();

  const result = await events.insertOne(event);

  return {
    ...event,
    _id: result.insertedId,
  };
}

export async function findEvents(username?: string, limit = 100) {
  const events = await getEventsCollection();

  const filter = username
    ? {
        $or: [{ actor: username }, { target: username }],
      }
    : {};

  return events.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
}
