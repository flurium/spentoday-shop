<script lang="ts">
  import type { PageData } from "./$types"
  import { catalogProducts } from "$features/catalog"
  import ScrollLoad from "$lib/components/ScrollLoad.svelte"

  export let data: PageData

  let products = data.products

  let search: string = ""
  let start: number = data.start

  let isLoading = false

  let timer: number

  function debounceChange() {
    clearTimeout(timer)
    timer = setTimeout(catalog, 700)
  }

  async function catalog() {
    const response = await catalogProducts(data.domain, search, 0)
    if (response == null) return

    products = response
    start = 0
  }

  async function loadMore(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const response = await catalogProducts(data.domain, search, start)
    if (response == null) {
      isLoading = false
      return "continue"
    }
    if (response.length == 0) return "stop"

    products = [...products, ...response]
    start += response.length

    isLoading = false
    return "continue"
  }
</script>

<div>
  <input type="text" on:keyup={debounceChange} bind:value={search} placeholder="Search products" />

  {#each products as product (product.id)}
    <span>
      {product.name}
    </span>
    <span>
      {product.price}
    </span>
  {/each}
  <ScrollLoad load={loadMore} />
</div>

<!-- {#if search.length > 0}
    {#await catalog(search, start, count)}
      <p>Loading...</p>
    {:then productsData}
      {#if productsData == null}
      <p>No products found.</p>
    {:else}
      <script>
        products = productsData;
      </script>
    {/if}
    {:catch error}
      <p>Error loading products.</p>
    {/await}
  {/if} -->
