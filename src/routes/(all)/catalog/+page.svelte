<script lang="ts">
  import { call, callJson } from "$lib"
  import type { PageData } from "./$types"
  import { onMount } from "svelte"

  export let data: PageData

  let start: number
  let count: number

  let products: Product[] | null

  type Product = {
    id: string
    name: string
    price: number
    isDraft: boolean
  }

  onMount(async () => {
    products = await catalog()
  })

  async function catalog() {
    const response = await call(fetch, {
      route: `/v1/shop/catalog/${data.domain}`,
      method: "POST"
    })
    if (!response || !response.ok) return null

    const json = await callJson<Product[]>(response)
    return json
  }
</script>

<div class="flex flex-col mt-8">
  {#if products != null}
    {#each products as product (product.id)}
      <span>
        {product.name}
      </span>
      <span>
        {product.price}
      </span>
    {/each}
  {/if}
</div>
