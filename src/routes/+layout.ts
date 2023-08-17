import { call, callJson } from "$lib"
import { error, redirect } from "@sveltejs/kit"
import type { LayoutLoad } from "./$types"

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
  const domain = url.hostname

  const response = await call(fetch, {
    route: `/v1/shop/${domain}/layout`,
    method: "GET"
  })
  if (!response) throw error(500, { message: "Не можемо зв'язатися з сервером." })

  if (response.ok) {
    const data = await callJson<LayoutShop>(response)
    if (!data) throw error(500, { message: "Не можемо зв'язатися з сервером." })
    return {
      domain,
      shop: data
    }
  }
  if (response.status == 404) throw redirect(302, "/not-found")
  throw error(500, { message: "Не можемо зв'язатися з сервером." })
}
