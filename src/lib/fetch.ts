import { PUBLIC_API_URL } from "$env/static/public";

type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

type FetchInfo = {
  route: `/${string}`;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: object;
};

/**
 * Fetch public data from server. Support only JSON as body.
 */
export async function call(fetch: Fetch, info: FetchInfo) {
  try {
    return await fetch(new URL(info.route, PUBLIC_API_URL), {
      method: info.method,
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(info.body)
    });
  } catch {
    return null;
  }
}

export async function callJson<T>(response: Response) {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
