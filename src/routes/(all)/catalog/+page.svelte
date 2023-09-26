<script lang="ts">
  import type { PageData } from "./$types"
  import { catalogProducts } from "$features/catalog"
  import ScrollLoad from "$lib/components/ScrollLoad.svelte"
  import { storageImageUrl } from "$lib"

  export let data: PageData

  let products = data.products

  let search = ""
  let start: number = data.start

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

  function debounceChange() {
    clearTimeout(timer)
    timer = setTimeout(catalog, 700)
  }

  async function catalog() {
    const response = await catalogProducts(
      data.domain,
      search,
      0,
      minPrice,
      maxPrice,
      orderBy
    )
    if (response == null) return

    infinityScroll = false

    products = response
    start = products.length
  }

  async function loadMore(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const response = await catalogProducts(
      data.domain,
      search,
      start,
      minPrice,
      maxPrice,
      orderBy
    )
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
  <div class="flex">
    <input
      class="w-1/2 bg-gray-100 focus:bg-gray-50 px-6 py-3 mr-6 rounded-md border border-gray-200"
      type="text"
      on:keyup={debounceChange}
      bind:value={search}
      placeholder="Пошук продуктів"
    />
    <input
      class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 mx-6 rounded-md border border-gray-200"
      type="number"
      on:keyup={debounceChange}
      bind:value={minPrice}
      max={maxPrice}
      placeholder="Мінімальна ціна"
    />
    <input
      class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 mx-6 rounded-md border border-gray-200"
      type="number"
      on:keyup={debounceChange}
      bind:value={maxPrice}
      min={minPrice}
      placeholder="Максимальна ціна"
    />

    <select
      class="w-1/6 bg-gray-100 block focus:bg-gray-50 px-6 py-3 ml-6 rounded-md border border-gray-200"
      bind:value={orderBy}
      on:change={debounceChange}
    >
      {#each [order["-//-"], order["Від дешевих до дорожчих"], order["Від дорогих до дешевших"]] as orderValue}
        <option value={orderValue}>{order[orderValue]}</option>
      {/each}
    </select>
  </div>

  <div class="grid grid-cols-5 gap-4">
    {#each products as product (product.id)}
      <div>
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
        {#if product.slug == ""}
          <a href="/catalog/{product.id}"> to page</a>
        {:else}
          <a href="/catalog/{product.slug}"> to page</a>
        {/if}
      </div>
    {/each}
  </div>

  {#if !infinityScroll}
    <button on:click={() => (infinityScroll = true)}>Load More</button>
  {:else}
    <ScrollLoad load={loadMore} />
  {/if}
</div>
