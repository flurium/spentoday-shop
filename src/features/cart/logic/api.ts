import { call, callJson } from "$lib";

export type ApiCartProduct = {
  id: string;
  name: string;
  price: number;
};

function hostname() {
  // because we can't use page store
  return window.location.hostname;
}

export async function apiCartProducts(productIds: string[]) {
  const response = await call(fetch, {
    route: "/v1/shop/cart/local",
    method: "POST",
    body: {
      domain: hostname(),
      ids: productIds
    }
  });
  if (response == null || !response.ok) return null;

  const json = await callJson<ApiCartProduct[]>(response);
  return json;
}
