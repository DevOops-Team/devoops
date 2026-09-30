import { openstackClient } from "./client";

export async function createFloatingIp() {
  const response = await openstackClient.request(
    `${process.env.NEUTRON_URL}/v2.0/floatingips`,
    {
      method: "POST",
      body: JSON.stringify({
        floatingip: {
          floating_network_id: process.env.FLOATING_NETWORK_ID,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create floating IP");
  }

  return response.json();
}

export async function associateFloatingIp(
  floatingIpId: string,
  portId: string,
) {
  return openstackClient.request(
    `${process.env.NEUTRON_URL}/v2.0/floatingips/${floatingIpId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        floatingip: {
          port_id: portId,
        },
      }),
    },
  );
}
