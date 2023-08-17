import type { PageLoad } from "./$types"

export const load = (async ({ url }) => {
  const domain = url.hostname

  return {
    domain: domain
  }
}) satisfies PageLoad
