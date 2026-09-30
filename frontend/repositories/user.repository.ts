import clientPromise from "@/lib/db/db";
import { User } from "@/types/user";

async function getUsersCollection() {
  const client = await clientPromise;

  return client.db(process.env.MONGODB_DB).collection<User>("users");
}

export async function findUser(username: string) {
  const users = await getUsersCollection();

  return users.findOne({ username });
}

export async function createUserIfNotExists(username: string, quota: number) {
  const users = await getUsersCollection();

  await users.updateOne(
    { username },
    {
      $setOnInsert: {
        username,
        role: "user",
        quota,
        disabled: false,
        createdAt: new Date(),
        lastLogin: null,
      },
    },
    { upsert: true },
  );
}

export async function loginUser(username: string) {
  const users = await getUsersCollection();

  return users.findOneAndUpdate(
    {
      username,
      disabled: false,
    },
    {
      $set: {
        lastLogin: new Date(),
      },
    },
    {
      returnDocument: "after",
    },
  );
}

export async function createUser(user: User) {
  const users = await getUsersCollection();

  await users.insertOne(user);
}

export async function updateUser(username: string, data: Partial<User>) {
  const users = await getUsersCollection();

  return users.findOneAndUpdate(
    { username },
    { $set: data },
    { returnDocument: "after" },
  );
}

export async function updateLastLogin(username: string) {
  const users = await getUsersCollection();

  return users.findOneAndUpdate(
    { username },
    {
      $set: {
        lastLogin: new Date(),
      },
    },
    {
      returnDocument: "after",
    },
  );
}

export async function deleteUser(username: string) {
  const users = await getUsersCollection();

  await users.deleteOne({ username });
}

export async function findAllUsers() {
  const users = await getUsersCollection();

  return users.find({}).sort({ createdAt: 1 }).toArray();
}
