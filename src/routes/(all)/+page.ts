import type { PageLoad } from "./$types" 
import { call, callJson } from "$lib/fetch"
import { errors, getDomain } from "$lib";

export type ShopData = {
  id: string;
  name: string;
  topBanner: string;
  categories: HomeCategory[];
  banners: HomeBanner[];
  products: HomeProduct[];
};

type HomeCategory = {
  id: string;
  name: string;
} 

export type HomeBanner = {
  id: string;
  url: string;
};

export type HomeProduct = {
  id: string;
  name: string;
  price: number;
  image: string
};


export const load = (async ({ fetch, url }) => {
  const domain = getDomain(url)
  const response = await call(fetch, {
   route: `/v1/shop/home/${domain}`, 
   method: "GET",
  })

  if (!response || !response.ok) throw errors.serverError()

  const data = await callJson<ShopData>(response)
  if (!data) throw errors.jsonError()

  return {
    shopData: data,
    domain: url.hostname
  }

}) satisfies PageLoad


