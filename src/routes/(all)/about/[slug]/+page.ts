import { call, callJson } from "$lib/fetch"
import { errors, getDomain } from "$lib"
import type { PageLoad } from "./$types"

export type InfoPage = {
  slug: string
  title: string
  content: string
  time: string
}
export const load: PageLoad = async ({ url, params }) => {
  const response = await call(fetch, {
    route: `/v1/shop/about/info/${params.slug}`,
    method: "GET"
  })

  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<InfoPage>(response)
  if (!data) throw errors.jsonError()

  return {
    infoPage: data
  }
}
