import type { DefaultSession } from "next-auth";
import type { UserRole } from "./user";

declare module "next-auth" {
  interface User {
    username: string;
    role: UserRole;
    quota: number;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      role: UserRole;
      quota: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: UserRole;
    quota: number;
  }
}
