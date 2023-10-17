<script lang="ts">
  import type { PageData } from "./$types"
  import { catalogProducts } from "$features/catalog"
  import ScrollLoad from "$lib/components/ScrollLoad.svelte"
  import autoAnimate from "@formkit/auto-animate"
  import ProductCard from "$features/catalog/ProductCard.svelte"
  import Seo from "$lib/components/Seo.svelte"

  export let data: PageData

  let products = data.products

  let search = ""
  let start: number = data.start

  const orders = [
    "Сортувати за новинками",
    "Від дешевих до дорожчих",
    "Від дорогих до дешевших"
  ]
  let orderBy = 0

  let isLoading = false

  let timer: number

  let infinityScroll = false

  let minPrice = products[0].price
  let maxPrice = minPrice
  for (let i = 1; i < products.length; i++) {
    if (products[i].price > maxPrice) maxPrice = products[i].price
    if (products[i].price < minPrice) minPrice = products[i].price
  }

  let categories: string[] = []

  function debounceChange() {
    console.log("change")
    clearTimeout(timer)
    timer = setTimeout(catalog, 500)
  }

  async function catalog() {
    const response = await catalogProducts(fetch, data.domain, {
      search: search,
      start: 0,
      min: minPrice,
      max: maxPrice,
      order: orderBy,
      categories: categories
    })
    if (response == null) return

    infinityScroll = false

    products = response
    start = products.length
  }

  async function loadMore(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const response = await catalogProducts(fetch, data.domain, {
      search: search,
      start: start,
      min: minPrice,
      max: maxPrice,
      order: orderBy,
      categories: categories
    })
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

<Seo
  title={"Каталог"}
  description={`Каталог в онлайн магазині "${
    data.shop.name
  }". Продає: ${data.shop.categories.join(", ")}`}
  shop={data.shop.name}
  domain={data.domain}
/>

<svelte:head>
  <title>{`Каталог | ${data.shop.name}`}</title>
  <meta
    name="description"
    content={`Каталог в онлайн магазині "${
      data.shop.name
    }". Продає: ${data.shop.categories.join(", ")}`}
  />
</svelte:head>

<div class="px-10 pt-5 pb-40">
  <input
    class="border border-lines rounded-full py-5 px-8 w-full"
    on:keyup={debounceChange}
    bind:value={search}
    placeholder="Пошук продуктів"
  />

  <div class="flex justify-end my-3">
    <select
      class="font-medium cursor-pointer p-3 bg-inherit"
      bind:value={orderBy}
      on:change={debounceChange}
    >
      {#each orders as order, i}
        <option value={i}>{order}</option>
      {/each}
    </select>
  </div>

  <div class="grid md:grid-cols-[auto_1fr] gap-10">
    <div class="max-w-xs text-secondary-700">
      <p class="mb-3">Ціна</p>

      <div class="grid grid-cols-[auto_auto] gap-4">
        <label class="self-center" for="min">Від</label>
        <input
          id="min"
          class="p-2 border border-lines bg-inherit"
          type="number"
          on:keyup={debounceChange}
          bind:value={minPrice}
          max={maxPrice}
          min={0}
        />
        <label class="self-center" for="max">До</label>
        <input
          class="p-2 border border-lines bg-inherit"
          type="number"
          id="max"
          on:keyup={debounceChange}
          bind:value={maxPrice}
          min={minPrice}
        />
      </div>

      <p class="mt-10 mb-5">Категорія</p>

      {#each data.categories.list as category}
        <label
          class="flex gap-3 items-center mb-5 cursor-pointer"
          style="padding-left: {0.5 * (category.level - 1)}rem"
        >
          <input
            class="appearance-none h-5 w-5 border-lines
            border checked:bg-lines cursor-pointer"
            type="checkbox"
            value={category.id}
            bind:group={categories}
            on:change={debounceChange}
          />
          {category.name}
        </label>
      {/each}
    </div>
    <div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        use:autoAnimate
      >
        {#each products as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>

      {#if !infinityScroll}
        <button on:click={() => (infinityScroll = true)}>Load More</button>
      {:else}
        <ScrollLoad load={loadMore} />
      {/if}
    </div>
  </div>
</div>
