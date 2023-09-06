<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData

  let products = data.shopData.products;
  const numVisibleProducts = 4;
  let startIndexProducts = 0;

  let banners = data.shopData.banners;
  const numVisibleBanners = 4;
  let startIndexBanners = 0;

  let arrowsVisible = false;

  function showArrows() {
    arrowsVisible = true;
  }

  function hideArrows() {
    arrowsVisible = false;
  }

  function scrollItems(startIndex: number, numVisible: number, items: any[], delta: number) {
    startIndex += delta;
    if (startIndex < 0) {
      startIndex = Math.max(0, items.length - (items.length % numVisible));
    } else if (startIndex >= items.length) {
      startIndex = 0;
    }
    return startIndex;
  }
</script>


<div class="w-full px-4">
  <img
    class="w-full h-auto mx-auto"
    src="{data.shopData.topBanner}"
    alt="Banner"
  />
</div>


<h2 class="text-5xl font-extrabold p-7 ml-12 mt-20 ">Нові продукти:</h2>
<div class="w-full relative overflow-hidden pb-1/5" role="region" aria-label="Carousel" on:mouseover={showArrows} on:mouseout={hideArrows} on:focus={showArrows} on:blur={hideArrows}>
  <div class="relative">
    <div class="flex items-center justify-center">
      <div class="w-full overflow-x-hidden overflow-y-hidden ml-16 mr-16">
        <div class="grid grid-cols-4 gap-4" id="productGrid">
          {#each products.slice(startIndexProducts, startIndexProducts + numVisibleProducts) as product}
            <div class="text-center relative"> 
              <div class="w-full h-auto pl-4 pr-4 mt-10"> 
                <img class="w-full h-auto object-contain border border-gray-300 mb-2" src="{product.image}" alt="Product" /> 
              </div>
              <div class="text-left pl-4">
                <h3 class="font-extrabold break-words whitespace-normal text-gray-600">{product.name}</h3> 
                <p class="break-words whitespace-normal text-gray-600">${product.price}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <button class="absolute left-0 ml-8 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200" on:click={() => startIndexProducts = scrollItems(startIndexProducts, numVisibleProducts, products, -1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#60;</button>
      <button class="absolute right-0 mr-8 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200" on:click={() => startIndexProducts = scrollItems(startIndexProducts, numVisibleProducts, products, 1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#62;</button>
    </div>
  </div>
</div>


<div class="w-full relative overflow-hidden pb-1/3 flex items-center justify-center mt-9" role="region" aria-label="Banner Carousel" on:mouseover={showArrows} on:mouseout={hideArrows} on:focus={showArrows} on:blur={hideArrows}>
  <button class="absolute left-0 ml-8 focus:outline-none hover:bg-gray-200" on:click={() => startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, -1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#60;</button>
  <div class="w-full overflow-x-hidden overflow-y-hidden mt-20"> 
    <div class="flex flex-row space-x-2 items-center justify-center">
      {#each banners.slice(startIndexBanners, startIndexBanners + numVisibleBanners) as banner}
        <div class="product-card my-2 p-2 rounded-md flex flex-col items-center w-2/3 mt-10"> 
          <img class="max-h-96 object-contain mb-2" src={`${banner.url}`} alt="Product Banner" /> 
        </div>
      {/each}
    </div>
  </div>
  <button class="absolute right-0 mr-8 focus:outline-none hover:bg-gray-200" on:click={() => startIndexBanners = scrollItems(startIndexBanners, numVisibleBanners, banners, 1)} class:hidden={!arrowsVisible} on:mouseenter={showArrows} on:mouseleave={hideArrows} >&#62;</button>
</div>



<div class="flex flex-col items-center mt-8">
  <div class="categories mt-4">
    <h2 class="mt-4 font-semibold text-2xl">Категорії :</h2>
    <ul class="list-none pl-0">
      {#each data.shopData.categories as category, i}
        <li class="text-gray-600 relative">
          <div class="my-2">
             <span class="font-semibold">{ i > 9 ? {i} : String(i + 1).padStart(2, '0')}</span> .{category.name}
          </div>
          <div class="w-full border-b border-gray-600 absolute bottom-0 left-0"></div>
        </li>
      {/each}
    </ul>
  </div>
</div>

