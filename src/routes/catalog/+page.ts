import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { catalogProducts } from "$features/catalog"

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

export const load = (async ({ url }) => {
  const domain = url.hostname

  let start = getStart(url)

  const response = await catalogProducts(domain, "", start)
  if (response == null) throw error(500, "Problem")

  return {
    domain: domain,
    products: response,
    start: start + response.length
  }
}) satisfies PageLoad
