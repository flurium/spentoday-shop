import type { PageLoad } from "./$types"
import { call, callJson, type StorageImage } from "$lib/fetch"
import { errors, getDomain } from "$lib"

export type ShopData = {
  id: string
  name: string
  topBanner: string
  categories: HomeCategory[]
  banners: HomeBanner[]
  products: HomeProduct[]
}

type HomeCategory = {
  id: string
  name: string
}

export type HomeBanner = {
  id: string
  url: string
}

export type HomeProduct = {
  id: string
  slug: string
  name: string
  price: number
  discountPrice: number
  isDiscount: boolean
  image: StorageImage
}

export const load: PageLoad = async ({ fetch, url }) => {
  const domain = getDomain(url)
  const response = await call(fetch, {
    route: `/v1/shop/home/${domain}`,
    method: "GET"
  })

  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<ShopData>(response)
  if (!data) throw errors.jsonError()

  return {
    shopData: data,
    domain: url.hostname
  }
}
