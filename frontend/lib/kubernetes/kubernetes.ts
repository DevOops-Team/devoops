import type { V1Pod, V1Service } from "@kubernetes/client-node";
import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();

if (process.env.NODE_ENV === "production") {
  kc.loadFromCluster();
} else {
  kc.loadFromDefault();
}

export const coreApi = kc.makeApiClient(k8s.CoreV1Api);

export type { V1Pod, V1Service };
