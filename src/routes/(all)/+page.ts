import type { PageLoad } from "./$types" 
import { call, callJson } from "$lib/fetch"
import { errors, getDomain } from "$lib";

export type ShopData = {
  id: string;
  name: string;
  topBanner: string;
  categories: LayoutCategory[];
  banners: LayoutBanner[];
  products: LayoutProduct[];
};

type LayoutCategory = {
  id: string;
  name: string;
} 

export type LayoutBanner = {
  id: string;
  url: string;
};

export type LayoutProduct = {
  id: string;
  name: string;
  price: number;
  image: string
};


export const load = (async ({ fetch, url }) => {
  const domain = getDomain(url)
  const response = await call(fetch, {
   route: `/v1/shop/${domain}/layout`, 
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


