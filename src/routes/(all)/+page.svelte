<script lang="ts">
  import ProductCard from "$features/catalog/ProductCard.svelte"
  import BannerSlider from "$features/home/BannerSlider.svelte"
  import Seo from "$lib/components/Seo.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  let products = data.shopData.products

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

{#if data.shopData.topBanner != null}
  <div class="pb-12 mb-8 md:mb-32">
    <div class="px-4 md:px-6 lg:px-12 w-full">
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

<div class="px-4 md:px-6 lg:px-12">
  <!----->
  <div class="flex gap-4 justify-between items-center mb-10">
    <a href="/catalog">
      <h2 class="text-5xl font-extrabold text-secondary-700">
        ПОПУЛЯРНІ ПРОДУКТИ
      </h2>
    </a>
    <a href="/catalog" class="hidden md:flex gap-4 items-center">
      <span class="md:text-lg font-semibold text-secondary-600">Більше</span>
      <span class="text-xl md:text-2xl font-thin text-secondary-500">
        &#129125;
      </span>
    </a>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each products as product}
      <ProductCard {product} />
    {/each}
  </div>

  <BannerSlider banners={data.shopData.banners} />

  <section class="my-32 grid gap-4 grid-cols-1 md:grid-cols-2">
    <h2 class="text-5xl font-extrabold text-secondary-700">
      ПОПУЛЯРНІ КАТЕГОРІЇ
    </h2>
    <div class="mt-10 text-secondary-600">
      {#each data.shopData.categories as category, i}
        <a
          href="/catalog?categories={category.id}"
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
        </a>
      {/each}
    </div>
  </section>
</div>
