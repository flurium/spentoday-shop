import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"

export const load = (async ({ url }) => {
  const domain = url.hostname

  return {
    domain: domain
  }
}) satisfies PageLoad
