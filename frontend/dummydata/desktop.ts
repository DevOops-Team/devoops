import { Desktop } from "@/types/desktop";

export const mockData: Desktop[] = [
  {
    id: "desktop-001",
    owner: "hansongyi",
    os: "ubuntu-xfce",
    osName: "Ubuntu XFCE",
    instanceId: null,
    floatingIp: null,
    status: "READY",
    node: "worker-01",
    createdAt: "2026-09-30T05:00:00.000Z",
  },
  {
    id: "desktop-002",
    owner: "hansongyi",
    os: "ubuntu-mate",
    osName: "Ubuntu MATE",
    instanceId: null,
    floatingIp: null,
    status: "CREATING",
    node: "worker-02",
    createdAt: "2026-09-30T05:10:00.000Z",
  },
];
