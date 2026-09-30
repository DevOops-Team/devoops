export type UserRole = "user" | "admin";

export interface User {
  username: string;
  role: UserRole;
  quota: number;
  disabled: boolean;
  createdAt: Date;
  lastLogin?: Date | null;
}
