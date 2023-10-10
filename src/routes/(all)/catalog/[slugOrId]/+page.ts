import { errors, getDomain } from "$lib"
import { call, callJson } from "$lib"
import type { PageLoad } from "./$types"

export type SingleProduct = {
  id: string
  name: string
  price: number
  discountPrice: number
  isDiscount: boolean
  amount: number
  seoTitle: string
  seoDescription: string
  seoSlug: string
  description: string
  images: string[]
}

export type ProductItemOutput = {
  id: string
  name: string
  price: number
  discountPrice: number
  isDiscount: boolean
  seoSlug: string
  image: string | null
}

export type ResponseProduct = {
  product: SingleProduct
  products: ProductItemOutput[]
  categories: string[]
}

export const load: PageLoad = async ({ params, url }) => {
  const domain = getDomain(url)
  const slugOrId = params.slugOrId

  const response = await call(fetch, {
    route: `/v1/shop/single/${domain}/${slugOrId}/product`,
    method: "GET"
  })
  if (!response) throw errors.serverError()

  const json = await callJson<ResponseProduct>(response)
  if (json == null) throw errors.serverError()

  return {
    product: json.product,
    similarProducts: json.products,
    categories: json.categories
  }
}
