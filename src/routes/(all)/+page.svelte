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
  let phrases = ["Великий вибір", "Новий стиль", "Великий вибір", "Новий стиль", "Великий вибір"]

</script>

{#if data.shopData.topBanner != null}
<div class="pb-12 mb-20">
<div class="px-12 w-full">
  <img
    class="w-full h-auto mx-auto"
    src={data.shopData.topBanner}
    alt="Banner"
  />
  </div>
  <div class="font-inter text-2xl font-semibold leading-8 tracking-wider text-gray-500">
    <div class="border-t-2 border-b-2 border-gray-400 py-2">
      {#each phrases as phrase}
        <div class="mx-8 inline-block uppercase">
          {phrase}
        </div>
        <div class="px-3 inline-block">/</div>
      {/each}
    </div>
</div>
</div>
{/if}

<div class="w-full relative">
  <h2 class="font-inter text-5xl font-extrabold leading-12 tracking-wide text-left text-gray-700 ml-12 mb-4">ПОПУЛЯРНІ ПРОДУКТИ</h2>
  <a href="#" class="absolute top-9 right-0 mr-12 flex items-center">
    <span class="font-inter text-lg font-semibold leading-5 tracking-normal text-left text-gray-600">Більше&nbsp;&nbsp;</span>
    <span class="text-2xl font-thin text-zinc-500">&#129125;</span>
  </a>
  <div class="grid grid-cols-4 gap-4 mx-10" id="productGrid">
    {#each products as product}
      <div class="text-center"> 
        {#if product.image}
          <div class="w-full h-auto px-2 mt-7 border-rgb-169-167-167 border-1"> 
            <img class="w-full h-auto object-contain border border-gray-300 mb-2" src="{product.image}" alt="Product" /> 
          </div>
        {/if}
        <div class="text-left pl-2">
          <h3 class="font-inter font-semibold leading-6 tracking-normal text-gray-700 text-20">{product.name}</h3>
          <p class="break-words whitespace-normal text-gray-700 text-20">{product.price} грн</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="w-full overflow-hidden pb-1/3 flex items-center justify-center mt-20" role="region" aria-label="Banner Carousel" on:mouseover={showArrows} on:mouseout={hideArrows} on:focus={showArrows} on:blur={hideArrows}>
  <div class="mt-20">
    <div class="flex items-center justify-center">
      <div class="w-full overflow-x-hidden overflow-y-hidden mx-12"> 
        <div class="grid grid-cols-2 gap-4">
          {#each banners.slice(startIndexBanners, startIndexBanners + numVisibleBanners) as banner}
            <div class="product-card my-2  rounded-md flex flex-col items-center w-full   mb-2"> 
              <img class="max-h-96 object-contain mb-2" src="{banner.url}" alt="Product Banner" /> 
            </div>
          {/each}
        </div>
      </div>
      <div>
        <button class="absolute left-0 ml-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200" on:click={() => startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, -1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#60;</button>
        <button class="absolute right-0 mr-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200" on:click={() => startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, 1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#62;</button>
      </div>
    </div>
  </div>
</div>

<section class="my-32 mx-12 grid grid-cols-1 md:grid-cols-2 text-secondary-600">
  <div>
    <h2 class="text-5xl font-extrabold">
      ПОПУЛЯРНІ<br/>КАТЕГОРІЇ
    </h2>
  </div>
  <ul class="mt-10">
    {#each data.shopData.categories as category, i}
      <li class="py-3 border-b border-b-secondary-400 flex justify-between items-center">
        <div>
          <span class="text-xl italic">
            {i > 9 ? {i} : String(i + 1).padStart(2, "0")}
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
