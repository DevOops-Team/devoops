export function createGuacamoleData(
  username: string,
  desktop: {
    id: string;
    floatingIp: string;
  },
) {
  const payload = {
    username,

    expires: Date.now() + Number(process.env.GUAC_DATA_TTL_SEC ?? 28800) * 1000,

    connections: {
      [`desktop-${desktop.id}`]: {
        protocol: "rdp",

        parameters: {
          hostname: desktop.floatingIp,
          port: "3389",
          username: process.env.VDI_DESKTOP_USER,
          password: process.env.VDI_DESKTOP_PASSWORD,
          security: "any",
          "ignore-cert": "true",
          "resize-method": "display-update",
          timezone: "Asia/Seoul",
        },
      },
    },
  };

  // HMAC + AES 처리
  // 기존 Python guacamole_data 로직을 여기로 이동

  return payload;
}
