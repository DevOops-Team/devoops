import { createInstance, deleteInstance, getInstance } from "./nova";

export class OpenStackDesktopBackend {
  async create(desktopId: string, owner: string, osKey: string) {
    // 1. Glance에서 이미지 확인
    // 2. Nova에서 VM 생성
    // 3. Neutron에서 네트워크 설정
    // 4. Floating IP 생성
    // 5. VM에 Floating IP 연결

    const instance = await createInstance({
      name: `desktop-${desktopId}`,
      imageId: "OPENSTACK_IMAGE_ID",
      flavorId: "OPENSTACK_FLAVOR_ID",
    });

    // 이후 Floating IP 연결

    return {
      id: desktopId,
      instanceId: instance.server.id,
      owner,
      os: osKey,
      status: "CREATING",
    };
  }

  async delete(instanceId: string) {
    await deleteInstance(instanceId);
  }

  async status(instanceId: string) {
    return getInstance(instanceId);
  }
}

export const desktopBackend = new OpenStackDesktopBackend();
