"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleLogin(username: string) {
    await signIn("credentials", {
      username,
      redirectTo: "/dashboard",
    });
  }

  return <button onClick={() => handleLogin("admin")}>로그인</button>;
}
