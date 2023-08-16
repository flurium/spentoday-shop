import { createCart } from "./logic/store";

export { default as Cart } from "./ui/Cart.svelte";

export const cart = createCart();
