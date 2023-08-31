import { getDomain } from "$lib"
import type { PageLoad } from "./$types"

export const load = (async ({ url }) => {
  const domain = getDomain(url)
  return {
    domain: domain
  }
}) satisfies PageLoad