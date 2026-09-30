export const VDI_IMAGES = {
  "ubuntu-xfce": {
    name: "Ubuntu XFCE",
    image: "lscr.io/linuxserver/rdesktop:ubuntu-xfce",
    desc: "가볍고 표준적인 데스크톱.",
  },

  "ubuntu-mate": {
    name: "Ubuntu MATE",
    image: "lscr.io/linuxserver/rdesktop:ubuntu-mate",
    desc: "익숙한 클래식 레이아웃의 풀 데스크톱.",
  },

  "ubuntu-icewm": {
    name: "Ubuntu IceWM",
    image: "lscr.io/linuxserver/rdesktop:ubuntu-icewm",
    desc: "최소 자원으로 빠르게 실행되는 경량 환경.",
  },
} as const;

export const VDI_NAMESPACE = process.env.VDI_NAMESPACE ?? "vdi-dev";

export const VDI_QUOTA_PER_USER = Number(process.env.VDI_QUOTA_PER_USER ?? 2);

export const LABEL_APP = "vdi-desktop";

export type VdiOs = keyof typeof VDI_IMAGES;
