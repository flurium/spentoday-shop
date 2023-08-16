import { call, callJson } from "$lib/fetch"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load = (async ({ fetch, url }) => {
  const response = await call(fetch, {
    route: "/v1/shop/cart/test",
    method: "GET"
  })
  if (response == null || !response.ok) throw error(500, "BAd")

  const json = await callJson<
    {
      id: string
      name: string
      price: number
      amount: number
      shopId: string
    }[]
  >(response)
  if (json == null) throw error(500, "BAd")

  return {
    products: json,
    domain: url.hostname
  }
}) satisfies PageLoad
