import { call, callJson, type StorageImage } from "$lib"

export type Product = {
  id: string
  name: string
  price: number
  image?: StorageImage
}

export async function catalogProducts(
  domain: string,
  search: string,
  start: number,
  min?: number,
  max?: number,
  order?: number
) {
  const response = await call(fetch, {
    route: `/v1/shop/catalog/${domain}`,
    method: "POST",
    body: {
      search: search,
      start: start,
      min: min,
      max: max,
      order: order
    }
  })
  console.log(min, max)

  if (!response || !response.ok) return null

  const json = await callJson<Product[]>(response)
  return json
}
