import { call, callJson, type Fetch, type StorageImage } from "$lib"

export type Product = {
  id: string
  name: string
  price: number
  discountPrice: number
  isDiscount: boolean
  image?: StorageImage
  slug: string
}

export async function catalogProducts(
  fetch: Fetch,
  domain: string,
  filters: {
    search: string
    start: number
    min?: number
    max?: number
    categories: string[]
    order?: number
  }
) {
  const response = await call(fetch, {
    route: `/v1/shop/catalog/${domain}`,
    method: "POST",
    body: {
      search: filters.search,
      start: filters.start,
      min: filters.min,
      max: filters.max,
      order: filters.order,
      categories: filters.categories
    }
  })

  if (!response || !response.ok) return null

  const json = await callJson<Product[]>(response)
  return json
}
