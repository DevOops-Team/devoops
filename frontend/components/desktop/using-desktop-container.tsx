"use client";

import { useEffect, useState } from "react";

import type { Desktop } from "@/types/desktop";
import { Card } from "antd";
import SectionTitle from "../common/section-title";
import UsingDesktopCard from "./using-desktop-card";

export default function UsingDesktopContainer({
  session,
  data,
}: {
  session: any;
  data: Desktop[];
}) {
  const [desktops, setDesktops] = useState<Desktop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;

    setDesktops(data);
    setLoading(false);
  }, [session, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  const usingDesktops = desktops.filter(
    (desktop) => desktop.status !== "DELETING",
  );

  const quota = session?.user?.quota ?? 2;

  return (
    <Card>
      <div className="flex justify-between">
        <SectionTitle text="사용 중인 데스크톱" />

        <span className="font-bold">
          {usingDesktops.length} / {quota}
        </span>
      </div>
      {usingDesktops.length > 0 && (
        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {usingDesktops.map((desktop: Desktop, index: number) => {
            return <UsingDesktopCard key={index} desktop={desktop} />;
          })}
        </div>
      )}
    </Card>
  );
}
