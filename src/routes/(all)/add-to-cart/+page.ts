import { call, callJson } from "$lib/fetch"
import type { PageLoad } from "./$types"
import { errors } from "$lib"

export const load: PageLoad = async ({ fetch, url }) => {
  const response = await call(fetch, {
    route: "/v1/shop/cart/test",
    method: "GET"
  })
  if (response == null || !response.ok) throw errors.serverError()

  const json = await callJson<
    {
      id: string
      name: string
      price: number
      amount: number
      shopId: string
    }[]
  >(response)
  if (json == null) throw errors.jsonError()

  return {
    products: json,
    domain: url.hostname
  }
}
