import { fromJson } from "$lib";

export type LocalCartProduct = {
  id: string;
  amount: number;
};

const cartPrefix = "cart-";

export function setLocalProduct(product: LocalCartProduct) {
  localStorage.setItem(`${cartPrefix}${product.id}`, JSON.stringify({ amount: product.amount }));
}

export function removeLocalProduct(id: string) {
  localStorage.removeItem(`${cartPrefix}${id}`);
}

export function localCartKey(index: number) {
  const key = localStorage.key(index);
  if (key == null || !key.startsWith(cartPrefix)) return null;
  return key;
}

export function localCartProducts() {
  let cart: LocalCartProduct[] = [];

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localCartKey(i);
    if (key == null) continue;

    const item = localStorage.getItem(key);
    if (item == null) continue;

    const json = fromJson<{ amount: number }>(item);
    if (json == null) continue;

    const id = key.slice(cartPrefix.length);
    cart.push({ id: id, amount: json.amount });
  }
  return cart;
}
