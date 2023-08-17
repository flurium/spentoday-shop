import { browser } from "$app/environment"
import { writable } from "svelte/store"
import { apiCartProducts } from "./api"
import { localCartKey, localCartProducts, removeLocalProduct, setLocalProduct } from "./local"
import { storageImageUrl } from "$lib"

type CartProduct = {
  id: string
  amount: number
  name: string
  price: number
  image?: string
}

async function getCart(): Promise<CartProduct[]> {
  const localCart = localCartProducts()
  if (localCart.length == 0) return []

  const apiCart = await apiCartProducts(localCart.map((x) => x.id))
  // HIDDEN PROBLEM!
  if (apiCart == null) return []

  let finalCart: CartProduct[] = []
  for (let i = 0; i < localCart.length; i += 1) {
    const localProduct = localCart[i]

    const apiProduct = apiCart.find((x) => x.id == localProduct.id)
    if (apiProduct == null) {
      removeLocalProduct(localProduct.id)
    } else {
      finalCart.push({
        id: localProduct.id,
        name: apiProduct.name,
        price: apiProduct.price,
        amount: localProduct.amount,
        image: apiProduct.image ? storageImageUrl(apiProduct.image) : undefined
      })
    }
  }
  return finalCart
}

export function createCart() {
  const store = writable<CartProduct[]>([])

  if (browser) {
    getCart().then((x) => store.set(x))
  }

  function add(product: CartProduct) {
    store.update((list) => [...list, product])
    setLocalProduct({ id: product.id, amount: product.amount })
  }

  function clear() {
    store.set([])

    for (let i = 0; i < localStorage.length; ++i) {
      const key = localCartKey(i)
      if (key != null) localStorage.removeItem(key)
    }
  }

  function remove(id: string) {
    removeLocalProduct(id)
    store.update((list) => list.filter((x) => x.id != id))
  }

  function changeAmount(id: string, num: number) {
    store.update((list) => {
      const item = list.find((x) => x.id == id)
      if (item == null) return list

      const newAmount = item.amount + num
      if (newAmount < 1) return list

      item.amount = newAmount
      setLocalProduct({ id, amount: newAmount })
      return list
    })
  }

  return { subscribe: store.subscribe, add, remove, clear, changeAmount }
}
