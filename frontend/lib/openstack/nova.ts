import { openstackClient } from "./client";

export async function createInstance(params: {
  name: string;
  imageId: string;
  flavorId: string;
}) {
  const response = await openstackClient.request(
    `${process.env.NOVA_URL}/servers`,
    {
      method: "POST",
      body: JSON.stringify({
        server: {
          name: params.name,
          imageRef: params.imageId,
          flavorRef: params.flavorId,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create OpenStack instance");
  }

  return response.json();
}

export async function deleteInstance(instanceId: string) {
  await openstackClient.request(
    `${process.env.NOVA_URL}/servers/${instanceId}`,
    {
      method: "DELETE",
    },
  );
}

export async function getInstance(instanceId: string) {
  const response = await openstackClient.request(
    `${process.env.NOVA_URL}/servers/${instanceId}`,
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}
