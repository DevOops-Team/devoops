import { OpenStackImage } from "@/types/image";
import { openstackClient } from "./client";

export async function listImages(): Promise<OpenStackImage[]> {
  const response = await openstackClient.request("/images");

  if (!response.ok) {
    throw new Error("Failed to fetch OpenStack images");
  }

  const data = await response.json();

  return data.images;
}

export async function getImage(
  imageId: string,
): Promise<OpenStackImage | null> {
  try {
    const response = await openstackClient.request(`/images/${imageId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch OpenStack images");
    }

    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}
