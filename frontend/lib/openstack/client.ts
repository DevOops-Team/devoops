export class OpenStackClient {
  private token?: string;

  async authenticate() {
    // Keystone 인증
    // token 발급
  }

  async request(url: string, options: RequestInit = {}) {
    if (!this.token) {
      await this.authenticate();
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "X-Auth-Token": this.token!,
        "Content-Type": "application/json",
      },
    });
  }
}

export const openstackClient = new OpenStackClient();
