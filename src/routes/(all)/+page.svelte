<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData

  let products = data.shopData.products

  let banners = data.shopData.banners
  const numVisibleBanners = 4
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
</script>

{#if data.shopData.topBanner != null}
  <img
    class="pb-12 px-12 mb-20 w-full h-auto"
    src={data.shopData.topBanner}
    alt="Banner"
  />
{/if}

<div class="flex justify-between items-end px-12 pb-10">
  <h2 class="text-5xl font-extrabold text-secondary-700">ПОПУЛЯРНІ ПРОДУКТИ</h2>
  <a href="/catalog" class="flex gap-4 items-center">
    <span class="text-lg font-semibold text-secondary-600">Більше</span>
    <span class="text-3xl font-thin text-secondary-500">&#129125;</span>
  </a>
</div>

<div class="grid grid-cols-4 gap-10 mx-12">
  {#each products as product}
    <div class="text-center relative">
      {#if product.image}
        <img
          class="w-full h-auto border border-secondary-300 mb-2"
          src={product.image}
          alt="Product"
        />
      {/if}
      <div class="text-left pl-2">
        <h3
          class="font-inter font-semibold leading-6 tracking-normal text-secondary-700 text-20"
        >
          {product.name}
        </h3>
        <p class="break-words whitespace-normal text-secondary-700 text-20">
          {product.price} грн
        </p>
      </div>
    </div>
  {/each}
</div>

<div
  class="w-full relative overflow-hidden pb-1/3 flex items-center justify-center mt-20"
  role="region"
  aria-label="Banner Carousel"
  on:mouseover={showArrows}
  on:mouseout={hideArrows}
  on:focus={showArrows}
  on:blur={hideArrows}
>
  <div class="relative mt-20">
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
              />
            </div>
          {/each}
        </div>
        <div />
      </div>
      <div />
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

<section class="my-32 mx-12 grid grid-cols-1 md:grid-cols-2 text-secondary-600">
  <div>
    <h2 class="text-5xl font-extrabold">
      ПОПУЛЯРНІ<br />КАТЕГОРІЇ
    </h2>
  </div>
  <ul class="mt-10">
    {#each data.shopData.categories as category, i}
      <li
        class="py-3 border-b border-b-secondary-400
        flex justify-between items-center"
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
