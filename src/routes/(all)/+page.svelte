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

  function scrollItems(startIndex: number, numVisible: number, items: any[], delta: number) {
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
  <div class="w-full px-4">
    <img class="w-full h-auto mx-auto" src={data.shopData.topBanner} alt="Banner" />
  </div>
{/if}

<div class="w-full relative mt-20">
  <h2 class="text-2xl font-bold text-gray-600 pl-4 top-0">ПОПУЛЯРНІ ПРОДУКТИ</h2>
  <a href="/catalog" class="absolute top-0 right-0 mr-4 text-gray-600">
    <span class="font-bold">Більше</span>&#129125;
  </a>
  <div class="grid grid-cols-4 gap-4" id="productGrid">
    {#each products.slice(0, 4) as product}
      <div class="text-center relative">
        {#if product.image}
          <div class="w-full h-auto pl-4 pr-4 mt-7">
            <img
              class="w-full h-auto object-contain border border-gray-300 mb-2"
              src={product.image}
              alt="Product"
            />
          </div>
        {/if}
        <div class="text-left pl-4">
          <h3 class="font-extrabold break-words whitespace-normal text-gray-600">{product.name}</h3>
          <p class="break-words whitespace-normal text-gray-600">{product.price} грн</p>
        </div>
      </div>
    {/each}
  </div>
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
      <div class="w-full overflow-x-hidden overflow-y-hidden ml-16 mr-16">
        <div class="grid grid-cols-2 gap-4">
          {#each banners.slice(startIndexBanners, startIndexBanners + numVisibleBanners) as banner}
            <div class="product-card my-2 p-2 rounded-md flex flex-col items-center w-full mb-2">
              <img class="max-h-96 object-contain mb-2" src={banner.url} alt="Product Banner" />
            </div>
          {/each}
        </div>
      </div>
      <div />
      <button
        class="absolute left-0 ml-8 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
        on:click={() =>
          (startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, -1))}
        class:hidden={!arrowsVisible}
        on:mouseenter={showArrows}
        on:mouseleave={hideArrows}>&#60;</button
      >
      <button
        class="absolute right-0 mr-8 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
        on:click={() =>
          (startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, 1))}
        class:hidden={!arrowsVisible}
        on:mouseenter={showArrows}
        on:mouseleave={hideArrows}>&#62;</button
      >
    </div>
  </div>
</div>

<div class="flex flex-col items-center mt-8">
  <div class="categories mt-4">
    <h2 class="mt-4 font-semibold text-2xl">ПОПУЛЯРНІ КАТЕГОРІЇ :</h2>
    <ul class="list-none pl-0">
      {#each data.shopData.categories as category, i}
        <li class="text-gray-600 relative">
          <div class="my-1">
            <span class="font-semibold italic text-sm">
              {i > 9 ? { i } : String(i + 1).padStart(2, "0")}
            </span>
            <span class="text-base">{category.name}</span>
          </div>
          <span class="absolute right-0 top-1">&#129125;</span>
          <div class="w-full border-b border-gray-600 relative" />
        </li>
      {/each}
    </ul>
  </div>
</div>
