import { createCart } from "./logic/store"

export { default as CartDialogContent } from "./ui/CartDialogContent.svelte"
export { default as CartIcon } from "./ui/CartIcon.svelte"

export const cart = createCart()
