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

  let minPrice = 0
  let maxPrice = products.reduce((max, product) => {
    return product.price > max ? product.price : max
  }, 0)

  let categories = data.categoriesToSearch

  function debounceChange() {
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
  }". Продає: ${data.shop.categories.map((x) => x.name).join(", ")}`}
  shop={data.shop.name}
  domain={data.domain}
/>

<div class="px-4 md:px-6 lg:px-12 pt-5 pb-40">
  <input
    class="border border-lines rounded-full py-5 px-8 w-full"
    on:keyup={debounceChange}
    bind:value={search}
    placeholder="Пошук продуктів"
  />

  <div class="flex md:justify-end justify-between my-3 text-secondary-700">
    <button 
    class="rounded md:hidden text-sm font-medium px-4 py-1 my-2 border border-lines"
    style="background-color: {data.shop.accentColor}"
    on:click={()=>{
    let filter = document.getElementById(`filter`)
    if (filter == null) return
    if (filter.style.display == "none") {
      filter.style.display = "block" 
      return
    }
    filter.style.display = "none"
    }}>
    Фільтрувати
    </button>
    <select
      class="font-medium text-sm cursor-pointer p-3 bg-inherit"
      bind:value={orderBy}
      on:change={debounceChange}
    >
      {#each orders as order, i}
        <option value={i}>{order}</option>
      {/each}
    </select>
  </div>

  <div class="grid md:grid-cols-[auto_1fr] gap-10">
    <div id="filter" class="hidden md:grid max-w-xs min-w-[12rem] text-secondary-700">
      <details open>
        <summary class="cursor-pointer">Ціна</summary>

        <div class="grid grid-cols-[auto_auto] gap-4 pt-4 w-full">
          <label class="self-center" for="min">Від</label>
          <input
            id="min"
            class="p-2 border border-lines bg-inherit"
            type="number"
            on:change={debounceChange}
            on:input={debounceChange}
            bind:value={minPrice}
            max={maxPrice}
            min={0}
          />
          <label class="self-center" for="max">До</label>
          <input
            class="p-2 border border-lines bg-inherit"
            type="number"
            id="max"
            on:input={debounceChange}
            on:change={debounceChange}
            bind:value={maxPrice}
            min={minPrice}
          />
        </div>
      </details>

      <details class="mt-6" open>
        <summary class="cursor-pointer mb-4">Категорія</summary>

        {#each data.categories.list as category}
          <label
            class="flex gap-3 items-center mb-4 cursor-pointer"
            style="padding-left: {1.25 * (category.level - 1)}rem"
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
      </details>
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
        <div class="text-center mt-8">
          <button
            class="rounded-full px-8 py-4 border border-lines"
            style="background-color: {data.shop.accentColor}"
            on:click={() => (infinityScroll = true)}>Завантажити більше</button
          >
        </div>
      {:else}
        <ScrollLoad load={loadMore} />
      {/if}
    </div>
  </div>
</div>
