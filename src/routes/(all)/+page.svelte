<script lang="ts">
  import ProductCard from "$features/catalog/ProductCard.svelte"
  import BannerSlider from "$features/home/BannerSlider.svelte"
  import Tagline from "$features/home/Tagline.svelte"
  import ListLink from "$lib/components/ListLink.svelte"
  import Seo from "$lib/components/Seo.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  let products = data.shopData.products
  let phrases = data.shopData.slogans
</script>

<Seo
  description="{`Онлайн магазин: ${
    data.shop.name
  }. Продає: ${data.shop.categories.map((x) => x.name).join(', ')}`}}"
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

    <Tagline {phrases} />
  </div>
{/if}

<div class="px-4 md:px-6 lg:px-12">
  <!----->
  <a href="/catalog" class="flex gap-4 justify-between items-center mb-10">
    <h2 class="text-5xl md:text-7xl font-bold text-secondary-700">
      ПОПУЛЯРНІ ПРОДУКТИ
    </h2>
    <span class="hidden md:flex gap-4 items-center">
      <span class="md:text-lg font-semibold text-secondary-600">Більше</span>
      <span class="text-xl md:text-2xl font-thin text-secondary-500">
        &#129125;
      </span>
    </span>
  </a>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each products as product}
      <ProductCard {product} />
    {/each}
  </div>

  <!-- <BannerSlider banners={data.shopData.banners} /> -->

  <section class="py-32">
    <h2 class="text-5xl md:text-7xl font-bold text-secondary-700 mb-10">
      ПОПУЛЯРНІ КАТЕГОРІЇ
    </h2>

    {#each data.shopData.categories as category, i}
      <ListLink
        link="/catalog?categories={category.id}"
        title={category.name}
        index={i}
      />
    {/each}
  </section>
</div>
