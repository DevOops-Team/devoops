export type DesktopStatus = "CREATING" | "READY" | "DELETING" | "ERROR";

export type DesktopStage = "scheduling" | "pulling" | "booting" | "ready";

export interface Desktop {
  id: string;
  owner: string;
  os: string;
  osName: string;

  // Kubernetes에서는 아직 없음
  instanceId: string | null;
  floatingIp: string | null;

  status: DesktopStatus;
  node: string | null;
  createdAt: string;
}

export interface CreateDesktopRequest {
  os: string;
}
