import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { catalogProducts } from "$features/catalog"
import { call, getDomain, type Fetch, callJson } from "$lib"

function getStart(url: URL) {
  const startParam = url.searchParams.get("start")
  if (startParam == null) {
    return 0
  }
  try {
    return Number.parseInt(startParam)
  } catch {
    return 0
  }
}

async function catalogCategories(fetch: Fetch, domain: string) {
  const res = await call(fetch, {
    route: `/v1/shop/catalog/${domain}/categories`,
    method: "GET"
  })
  if (res == null || !res.ok) return null

  const json = await callJson<
    {
      id: string
      name: string
      parentId: string | null
    }[]
  >(res)
  return json
}

export const load = (async ({ fetch, url }) => {
  const domain = getDomain(url)
  const start = getStart(url)

  const products = await catalogProducts(fetch, domain, {
    search: "",
    start: start,
    categories: []
  })
  if (products == null) throw error(500, "Problem")

  const categories = await catalogCategories(fetch, domain)
  if (categories == null) throw error(500, "Не можемо завантажити категорії")

  return {
    domain: domain,
    products: products,
    start: start + products.length,
    categories
  }
}) satisfies PageLoad
