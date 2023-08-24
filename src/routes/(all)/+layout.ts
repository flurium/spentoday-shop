import { call, callJson, errors } from "$lib"
import { redirect } from "@sveltejs/kit"
import type { LayoutLoad } from "./$types"
import { dev } from "$app/environment"

/*

On all pages we need:
- name of shop
- categories: (name, slug)
- pages: (name, slug)
- social links (for footer)

*/

export type LayoutShop = {
  id: string
  name: string
  categories: { id: string; name: string }[]
  pages: { slug: string; name: string }[]
  socialMediaLinks: { name: string; link: string }[]
}

export const load: LayoutLoad = async ({ fetch, url }) => {
  const domain = dev ? "free.spentoday.com" : url.hostname

  const response = await call(fetch, {
    route: `/v1/shop/${domain}/layout`,
    method: "GET"
  })
  if (!response) throw errors.serverError()

  if (response.ok) {
    const data = await callJson<LayoutShop>(response)
    if (!data) throw errors.jsonError()
    return { domain, shop: data }
  }
  if (response.status == 404) throw redirect(302, "/not-found")
  throw errors.serverError()
}
