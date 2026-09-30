"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-bold">DevOops VDI</span>
        </Link>

        {/* Navigation */}
        <nav className="ml-10 flex h-full flex-1 items-center justify-end gap-1">
          <Link
            href="/dashboard"
            className={`flex h-full items-center px-4 text-sm font-medium transition-colors ${
              isActive("/dashboard")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            대시보드
          </Link>

          <Link
            href="/mypage"
            className={`flex h-full items-center px-4 text-sm font-medium transition-colors ${
              isActive("/mypage")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            마이페이지
          </Link>
        </nav>

        {/* Right */}
        <div className="ml-auto"></div>
      </div>
    </header>
  );
}
