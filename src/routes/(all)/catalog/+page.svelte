<script lang="ts">
  import type { PageData } from "./$types"
  import { catalogProducts } from "$features/catalog"
  import ScrollLoad from "$lib/components/ScrollLoad.svelte"
  import { storageImageUrl } from "$lib"

  export let data: PageData

  let products = data.products

  let search = ""
  let start = data.start

  enum order {
    "-//-" = 0,
    "Від дешевих до дорожчих",
    "Від дорогих до дешевших"
  }
  let orderBy = order["-//-"]

  let isLoading = false

  let timer: number

  let infinityScroll = false

  let minPrice = products[0].price
  let maxPrice = minPrice
  for (let i = 1; i < products.length; i++) {
    if (products[i].price > maxPrice) maxPrice = products[i].price
    if (products[i].price < minPrice) minPrice = products[i].price
  }

  let min = minPrice.toString()
  let max = maxPrice.toString()

  function debounceChange() {
    clearTimeout(timer)
    timer = setTimeout(catalog, 700)
  }

  async function catalog() {
    const response = await catalogProducts(data.domain, search, 0, +min, +max, orderBy)
    if (response == null) return

    infinityScroll = false

    products = response
    start = products.length
  }

  async function loadMore(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const response = await catalogProducts(data.domain, search, start, +min, +max, orderBy)
    if (response == null) {
      isLoading = false
      return "continue"
    }
    if (response.length == 0) return "stop"

    infinityScroll = false

    products = [...products, ...response]
    start += response.length

    isLoading = false
    return "continue"
  }
</script>

<div>
  <input type="text" on:keyup={debounceChange} bind:value={search} placeholder="Search products" />
  <input
    type="number"
    on:keyup={debounceChange}
    bind:value={min}
    min={minPrice}
    max={maxPrice}
    placeholder="Min price"
  />
  <input
    type="number"
    on:keyup={debounceChange}
    bind:value={max}
    min={minPrice}
    max={maxPrice}
    placeholder="Max price"
  />

  <select bind:value={orderBy} on:change={debounceChange}>
    {#each [order["-//-"], order["Від дешевих до дорожчих"], order["Від дорогих до дешевших"]] as orderValue}
      <option value={orderValue}>{order[orderValue]}</option>
    {/each}
  </select>

  <ul>
    {#each products as product (product.id)}
      <li>
        <span>
          Назва: {product.name}
        </span>
        <span>
          Ціна: {product.price}
        </span>
        {#if product.image != null}
          <img
            width="200px"
            height="200px"
            src={storageImageUrl(product.image)}
            alt="product-img"
          />
        {/if}
      </li>
    {/each}
  </ul>

  {#if !infinityScroll}
    <button on:click={() => (infinityScroll = true)}>Load More</button>
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
