import { PUBLIC_API_URL, PUBLIC_STORJ_SHOPS_KEY } from "$env/static/public"

export type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>

type FetchInfo = {
  route: `/${string}`
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
  body?: object
}

/**
 * Fetch public data from server. Support only JSON as body.
 */
export async function call(fetchFunc: Fetch, info: FetchInfo) {
  try {
    // console.log(info)
    // console.log("==", fetchFunc == fetch)
    // console.log("===", fetchFunc === fetch)

    return await fetchFunc(new URL(info.route, PUBLIC_API_URL), {
      method: info.method,
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(info.body)
    })
  } catch (e: any) {
    return null
  }
}

export async function callJson<T>(response: Response) {
  try {
    return (await response.json()) as T
  } catch {
    return null
  }
}

export type StorageImage = {
  provider: string // "storj" | "github"
  bucket: string
  key: string
}

export function storageImageUrl(image: StorageImage): string | undefined {
  if (image.provider == "storj") {
    // shops bucket
    return `https://link.storjshare.io/raw/${PUBLIC_STORJ_SHOPS_KEY}/${image.bucket}/${image.key}`
  }

  if (image.provider == "github") {
    return `https://raw.githubusercontent.com/flurium/${image.bucket}/main/${image.key}`
  }

  return undefined
}
