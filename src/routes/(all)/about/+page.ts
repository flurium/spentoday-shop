import { call, callJson } from "$lib/fetch"
import { errors, getDomain } from "$lib"
import type { PageLoad } from "./$types"

export type InfoPages = {
   slug :string,
   title : string,
}

export const load: PageLoad = async ({fetch, url }) => {
  const shopDomain = getDomain(url)
  const response = await call(fetch, {
    route: `/v1/shop/about/${shopDomain}`,
    method: "GET"
  })

  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<InfoPages[]>(response)
  if (!data) throw errors.jsonError()

  return {
    infoData: data,
    domain: url.hostname
  }
}
