import { LABEL_APP, VDI_IMAGES, VDI_NAMESPACE, type VdiOs } from "@/config/vdi";
import {
  coreApi,
  type V1Pod,
  type V1Service,
} from "@/lib/kubernetes/kubernetes";
import { Desktop } from "@/types/desktop";

function getStatus(pod: V1Pod): Desktop["status"] {
  if (pod.metadata?.deletionTimestamp) {
    return "DELETING";
  }

  const ready = pod.status?.conditions?.some(
    (condition: { type: string; status: string }) =>
      condition.type === "Ready" && condition.status === "True",
  );

  if (ready) {
    return "READY";
  }

  if (pod.status?.phase === "Failed") {
    return "ERROR";
  }

  return "CREATING";
}

/**
 * Desktop 생성
 * Pod + Service 생성
 */
export async function createDesktop(
  username: string,
  os: string,
): Promise<Desktop> {
  const image = VDI_IMAGES[os as VdiOs]?.image;

  if (!image) {
    throw new Error(`Unknown OS: ${os}`);
  }

  const desktopId = crypto.randomUUID().replace(/-/g, "").slice(0, 6);
  const name = `desk-${desktopId}`;

  const labels = {
    app: LABEL_APP,
    "vdi/id": desktopId,
    "vdi/owner": username,
    "vdi/os": os,
  };

  const pod: V1Pod = {
    metadata: {
      name,
      labels,
    },

    spec: {
      hostname: name,

      containers: [
        {
          name: "desktop",
          image,
          imagePullPolicy: "IfNotPresent",

          env: [
            {
              name: "TZ",
              value: "Asia/Seoul",
            },
          ],

          ports: [
            {
              name: "rdp",
              containerPort: 3389,
            },
          ],

          readinessProbe: {
            tcpSocket: {
              port: 3389,
            },
            periodSeconds: 5,
          },

          resources: {
            requests: {
              cpu: "100m",
              memory: "256Mi",
            },
            limits: {
              memory: "1536Mi",
            },
          },

          volumeMounts: [
            {
              name: "shm",
              mountPath: "/dev/shm",
            },
          ],
        },
      ],

      volumes: [
        {
          name: "shm",
          emptyDir: {
            medium: "Memory",
            sizeLimit: "512Mi",
          },
        },
      ],
    },
  };

  const service: V1Service = {
    metadata: {
      name,
      labels,
    },

    spec: {
      selector: {
        "vdi/id": desktopId,
      },

      ports: [
        {
          name: "rdp",
          port: 3389,
          targetPort: 3389,
        },
      ],
    },
  };

  await coreApi.createNamespacedPod({
    namespace: VDI_NAMESPACE,
    body: pod,
  });

  try {
    await coreApi.createNamespacedService({
      namespace: VDI_NAMESPACE,
      body: service,
    });
  } catch (error) {
    // Service 생성 실패하면 Pod도 삭제
    await deleteDesktop(desktopId);
    throw error;
  }

  return {
    id: desktopId,
    owner: username,
    os,
    osName: VDI_IMAGES[os as VdiOs]?.name,
    instanceId: null,
    floatingIp: null,
    status: "CREATING",
    node: null,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Desktop 삭제
 */
export async function deleteDesktop(desktopId: string) {
  const name = `desk-${desktopId}`;

  // Service 먼저 삭제
  try {
    await coreApi.deleteNamespacedService({
      namespace: VDI_NAMESPACE,
      name,
    });
  } catch (error: any) {
    if (error?.response?.statusCode !== 404) {
      throw error;
    }
  }

  // Pod 삭제
  try {
    await coreApi.deleteNamespacedPod({
      namespace: VDI_NAMESPACE,
      name,
    });
  } catch (error: any) {
    if (error?.response?.statusCode !== 404) {
      throw error;
    }
  }

  return {
    id: desktopId,
    status: "DELETING",
  };
}

/**
 * Desktop 하나 조회
 */
export async function getDesktop(desktopId: string): Promise<Desktop | null> {
  try {
    const response = await coreApi.readNamespacedPod({
      namespace: VDI_NAMESPACE,
      name: `desk-${desktopId}`,
    });

    return podToDesktop(response);
  } catch (error: any) {
    if (error?.response?.statusCode === 404) {
      return null;
    }

    throw error;
  }
}

/**
 * Desktop 전체 조회
 */
export async function getDesktops(username?: string): Promise<Desktop[]> {
  const selector = username
    ? `app=${LABEL_APP},vdi/owner=${username}`
    : `app=${LABEL_APP}`;

  const response = await coreApi.listNamespacedPod({
    namespace: VDI_NAMESPACE,
    labelSelector: selector,
  });

  return response.items.map(podToDesktop);
}

/**
 * Kubernetes Pod → Desktop 객체 변환
 */
function podToDesktop(pod: V1Pod): Desktop {
  const labels = pod.metadata?.labels ?? {};

  return {
    id: labels["vdi/id"],
    owner: labels["vdi/owner"],
    os: labels["vdi/os"],
    osName: VDI_IMAGES[labels["vdi/os"] as VdiOs]?.name,
    instanceId: null,
    floatingIp: null,
    status: getStatus(pod),
    node: pod.spec?.nodeName ?? null,
    createdAt:
      pod.metadata?.creationTimestamp?.toISOString() ??
      new Date().toISOString(),
  };
}
