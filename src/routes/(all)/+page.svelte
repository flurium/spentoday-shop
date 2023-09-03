<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData
  let showAllCategories = false

  function toggleCategories() {
    showAllCategories = !showAllCategories
  }
</script>

<div>
  {#if data != null}
    <div class="w-full relative overflow-hidden" style="height: 0; padding-bottom: 10%;">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover"
        src={`${data.shopData.topBanner}`}
        alt="Banner"
      />
    </div>
    <h2 class="text-4xl font-bold p-4">Нові продукти:</h2>
    <div class="flex flex-row overflow-x-scroll space-x-2">
      {#each data.shopData.products as product}
        <div
          class="product-card my-2 p-2 border rounded-md flex flex-col items-center w-[130%] h-[130%]"
        >
          <img class="max-h-32 object-contain mb-2" src={`${product.image}`} alt="Product" />
          <h3 class="text-center mt-2">{product.name}</h3>
          <p class="text-center">${product.price}</p>
        </div>
      {/each}
    </div>

    <h2 class="text-4xl font-bold p-4">Банери:</h2>
    <div class="flex flex-row overflow-x-scroll space-x-2">
      {#each data.shopData.banners as banner}
        <div
          class="product-card my-2 p-2 border rounded-md flex flex-col items-center w-[130%] h-[130%]"
        >
          <img class="max-h-32 object-contain mb-2" src={`${banner.url}`} alt="Product Banner" />
        </div>
      {/each}
    </div>

    <div class="flex flex-col items-center mt-8">
      <div class="categories mt-4">
        <h2 class="mt-4">Categories :</h2>
        <div
          class="max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out"
          class:show-categories={showAllCategories}
        >
          <div class="flex flex-col items-center">
            {#each data.shopData.categories as category}
                <p class="my-2">{category.name}</p>    
           {/each}
          </div>
        </div>
        <button class="text-blue-500 cursor-pointer mt-2" on:click={toggleCategories}>
          {#if showAllCategories} Show Less {:else} Show More {/if}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .show-categories {
    max-height: 1000px;
  }
</style>
