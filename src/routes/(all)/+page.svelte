<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public"
  import Seo from "$lib/components/Seo.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  let products = data.shopData.products

  let banners = data.shopData.banners
  const numVisibleBanners = 2
  let startIndexBanners = 0

  let arrowsVisible = false

  function showArrows() {
    arrowsVisible = true
  }

  function hideArrows() {
    arrowsVisible = false
  }

  function scrollItems(
    startIndex: number,
    numVisible: number,
    items: any[],
    delta: number
  ) {
    startIndex += delta
    if (startIndex < 0) {
      startIndex = Math.max(0, items.length - (items.length % numVisible))
    } else if (startIndex >= items.length) {
      startIndex = 0
    }
    return startIndex
  }
  let phrases = [
    "Великий вибір",
    "Новий стиль",
    "Великий вибір",
    "Новий стиль",
    "Великий вибір"
  ]
</script>

<Seo
  description="{`Онлайн магазин: ${
    data.shop.name
  }. Продає: ${data.shop.categories.join(', ')}`}}"
  shop={data.shop.name}
  domain={data.domain}
/>

<svelte:head>
  {#if data.shopData.topBanner != null}
    <link rel="preload" href={data.shopData.topBanner} as="image" />
  {/if}
</svelte:head>

{#if data.shopData.topBanner != null}
  <div class="pb-12 mb-32">
    <div class="px-12 w-full">
      <img
        class="w-full h-auto mx-auto border-x border-lines"
        src={data.shopData.topBanner}
        alt="Banner"
        width="1200"
        height="600"
        loading="eager"
      />
    </div>

    <div
      class="text-xl font-semibold text-secondary-500 border-y border-lines
      flex justify-around items-center"
    >
      {#each phrases as phrase, i}
        <div class="py-4 uppercase">{phrase}</div>
        {#if i != phrases.length - 1}
          <div>/</div>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<div class="flex justify-between items-center px-12 mb-10">
  <h2 class="text-5xl font-extrabold text-secondary-700">ПОПУЛЯРНІ ПРОДУКТИ</h2>
  <a href="/catalog" class="flex gap-4 items-center">
    <span class="text-lg font-semibold text-secondary-600"> Більше </span>
    <span class="text-2xl font-thin text-secondary-500">&#129125;</span>
  </a>
</div>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mx-10">
  {#each products as product}
    <div class="text-center">
      {#if product.image}
        <div class="w-full h-auto px-2 mt-7 border-rgb-169-167-167 border-1">
          <img
            width="400"
            height="400"
            class="w-full h-auto object-contain border border-gray-300 mb-2"
            src={product.image}
            alt="Product"
          />
        </div>
      {/if}
      <div class="text-left pl-2">
        <h3
          class="font-inter font-semibold leading-6 tracking-normal text-gray-700 text-20"
        >
          {product.name}
        </h3>
        {#if product.isDiscount}
          <p class="reak-words whitespace-normal text-secondary text-20">
            {product.discountPrice} грн.
            <sup class="text-secondary-400 line-through"> {product.price}</sup>
          </p>
        {:else}
          <p class="reak-words whitespace-normal text-secondary text-20">
            {product.price} грн.
          </p>
        {/if}
      </div>
    </div>
  {/each}
</div>

<div
  class="w-full overflow-hidden pb-1/3 flex items-center justify-center mt-20"
  role="region"
  aria-label="Banner Carousel"
  on:mouseover={showArrows}
  on:mouseout={hideArrows}
  on:focus={showArrows}
  on:blur={hideArrows}
>
  <div class="mt-20">
    <div class="flex items-center justify-center">
      <div class="w-full overflow-x-hidden overflow-y-hidden mx-12">
        <div class="grid grid-cols-2 gap-4">
          {#each banners.slice(startIndexBanners, startIndexBanners + numVisibleBanners) as banner}
            <div
              class="product-card my-2 rounded-md flex flex-col items-center w-full mb-2"
            >
              <img
                class="max-h-96 object-contain mb-2"
                src={banner.url}
                alt="Product Banner"
                width="600"
                height="250"
                loading="lazy"
              />
            </div>
          {/each}
        </div>
      </div>
      <div>
        <button
          class="absolute left-0 ml-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
          on:click={() =>
            (startIndexBanners = scrollItems(
              startIndexBanners,
              numVisibleBanners,
              banners,
              -1
            ))}
          class:hidden={!arrowsVisible}
          on:mouseenter={showArrows}
          on:mouseleave={hideArrows}>&#60;</button
        >
        <button
          class="absolute right-0 mr-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
          on:click={() =>
            (startIndexBanners = scrollItems(
              startIndexBanners,
              numVisibleBanners,
              banners,
              1
            ))}
          class:hidden={!arrowsVisible}
          on:mouseenter={showArrows}
          on:mouseleave={hideArrows}>&#62;</button
        >
      </div>
    </div>
  </div>
</div>

<section class="my-32 mx-12 grid grid-cols-1 md:grid-cols-2 text-secondary-600">
  <div>
    <h2 class="text-5xl font-extrabold">
      ПОПУЛЯРНІ<br />КАТЕГОРІЇ
    </h2>
  </div>
  <ul class="mt-10">
    {#each data.shopData.categories as category, i}
      <li
        class="py-3 border-b border-b-secondary-400 flex justify-between items-center"
      >
        <div>
          <span class="text-xl italic">
            {i > 9 ? { i } : String(i + 1).padStart(2, "0")}
          </span>
          <span class="text-2xl ml-4 font-semibold">
            {category.name}
          </span>
        </div>
        <span class="text-2xl">&#129125;</span>
      </li>
    {/each}
  </ul>
</section>
