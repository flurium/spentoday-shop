<script lang="ts">
  import type { PageData } from "./$types"
  import { catalogProducts } from "$features/catalog"
  import ScrollLoad from "$lib/components/ScrollLoad.svelte"
  import { storageImageUrl } from "$lib"

  export let data: PageData

  let products = data.products

  let search: string = ""

  let min: string = ""
  let max: string = ""

  let start: number = data.start

  let isLoading = false

  let timer: number

  let infinityScroll = false

  function debounceChange() {
    clearTimeout(timer)
    timer = setTimeout(catalog, 700)
  }

  async function catalog() {
    const response = await catalogProducts(data.domain, search, 0, +min, +max)
    if (response == null) return

    products = response
    start = 0
  }

  async function loadMore(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const response = await catalogProducts(data.domain, search, start, +min, +max)
    if (response == null) {
      isLoading = false
      return "continue"
    }
    if (response.length == 0) return "stop"

    products = [...products, ...response]
    start += response.length
    infinityScroll = false

    isLoading = false
    return "continue"
  }
</script>

<div>
  <input type="text" on:keyup={debounceChange} bind:value={search} placeholder="Search products" />
  <input type="number" on:keyup={debounceChange} bind:value={min} placeholder="Min price" />
  <input type="number" on:keyup={debounceChange} bind:value={max} placeholder="Max price" />

  {#each products as product (product.id)}
    <span>
      Назва: {product.name}
    </span>
    <span>
      Ціна: {product.price}
    </span>
    {#if product.image != null}
      <img src={storageImageUrl(product.image)} alt="product-img" />
    {/if}
  {/each}
  {#if !infinityScroll}
    <button on:click={() => (infinityScroll = true)}> Load More </button>
  {:else}
    <ScrollLoad load={loadMore} />
  {/if}
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
