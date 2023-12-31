<script lang="ts">
  import { cart } from "$features/cart"
  import Minus from "$features/cart/ui/Minus.svelte"
  import Plus from "$features/cart/ui/Plus.svelte"
  import Seo from "$lib/components/Seo.svelte"
  import ProductCard from "$features/catalog/ProductCard.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  $: images = data.product.images

  $: amount = $cart.find((x) => x.id == data.product.id)?.amount ?? 1
  let currentImage = 0

  function changeAmount(arg: number) {
    if (amount == 1 && arg == -1) return
    cart.changeAmount(data.product.id, arg)
  }

  function changeImage(arg: number) {
    if (currentImage == 0 && arg == -1) {
      currentImage = images.length - 1
      return
    } else if (currentImage == images.length - 1) {
      currentImage = 0
      return
    }
    currentImage += arg
  }
</script>

<Seo
  title={data.product.seoTitle}
  description={data.product.seoDescription}
  shop={data.shop.name}
  domain={data.domain}
  images={data.product.images}
/>

<div class="px-4 md:px-6 lg:px-12 pt-16 pb-36">
  <div class="flex gap-1 mb-6">
    {#each data.categories as category, i}
      {#if i < data.categories.length - 1}
        <a href="/catalog?categories={category.id}" class="text-secondary-400">
          {category.name}
        </a>
        <span class="text-secondary-400">{"/"}</span>
      {:else}
        <a href="/catalog?categories={category.id}" class="text-secondary-700">
          {category.name}
        </a>
      {/if}
    {/each}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-5 gap-10">
    <div class="md:col-span-2">
      <div class="relative">
        <div
          class="relative border border-gray-400 w-full overflow-hidden after:clear-both after:block after:content-['']"
        >
          <div
            class="relative float-left min-w-full -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={images[currentImage]}
              class="block w-full"
              alt={data.product.name}
            />
          </div>
        </div>

        <button
          on:click={() => changeImage(-1)}
          class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-secondary-700 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-secondary-700 hover:no-underline hover:opacity-90 hover:outline-none focus:text-secondary-700 focus:no-underline focus:opacity-90 focus:outline-none"
          type="button"
        >
          <span class="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Previous
          </span>
        </button>

        <button
          on:click={() => changeImage(1)}
          class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-secondary-700 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-secondary-700 hover:no-underline hover:opacity-90 hover:outline-none focus:text-secondary-700 focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
        >
          <span class="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Next
          </span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <div class="inline-block whitespace-nowrap mt-7 mb-2">
          {#each images as image, i}
            <button
              class="w-24 md:w-32 h-auto border border-secondary-300
              {i == images.length - 1 ? '' : 'mr-4'}"
              on:click={() => (currentImage = i)}
            >
              <img src={image} alt={image} />
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="md:col-span-3">
      <h1 class="font-bold text-5xl text-secondary-700">
        {data.product.name}
      </h1>
      {#if data.product.isDiscount}
        <p class="text-xl text-red-500 mt-5">
          <span class="mr-3 text-gray-500 line-through">
            {data.product.price} грн.
          </span>
          {data.product.discountPrice} грн.
        </p>
      {:else}
        <p class="text-xl text-red-500 mt-5">
          {data.product.price} грн.
        </p>
      {/if}
      <p class="md:text-lg lg:text-xl text-gray-600 mt-8">
        {data.product.description}
      </p>

      <div class="flex flex-wrap-reverse gap-8 self-end mt-12">
        {#if $cart.some((x) => x.id == data.product.id)}
          <button
            class="bg-secondary-200 px-14 py-5 rounded-full inline-block border border-lines md:w-fit w-full"
            on:click={() => cart.remove(data.product.id)}
          >
            Видалити з кошику
          </button>
        {:else}
          <button
            on:click={() =>
              cart.add({
                id: data.product.id,
                name: data.product.name,
                price: data.product.price,
                discountPrice: data.product.discountPrice,
                isDiscount: data.product.isDiscount,
                amount: amount,
                image:
                  data.product.images.length > 0
                    ? data.product.images[0]
                    : undefined
              })}
            class="px-14 py-5 rounded-full border border-lines md:w-fit w-full"
            style={`background-color: ${data.shop.accentColor};`}
          >
            Додати до кошику
          </button>
        {/if}

        <div
          class="grid grid-cols-3 md:w-fit w-full place-items-center
          border border-lines rounded-full"
        >
          <button
            on:click={() => changeAmount(1)}
            class="p-5 border-r border-r-lines grid place-items-center w-full"
          >
            <Plus />
          </button>

          <span class="px-5 text-lg font-semibold">{amount}</span>

          <button
            on:click={() => changeAmount(-1)}
            class="p-5 border-l border-l-lines grid place-items-center"
          >
            <Minus />
          </button>
        </div>
      </div>
    </div>
  </div>

  {#if data.product.properties.length > 0}
    <h3 class="text-4xl md:text-6xl font-bold text-secondary-700 mt-36 mb-10">
      ХАРАКТЕРИСТИКИ
    </h3>

    <table
      class="table-auto w-full border-collapse border border-lines my-10 text-secondary-700"
    >
      {#each data.product.properties as property}
        <tr>
          <td class="border border-lines text-left p-3">{property.key}</td>
          <td class="border border-lines text-left p-3">{property.value}</td>
        </tr>
      {/each}
    </table>
  {/if}

  <h3 class="text-4xl md:text-6xl font-bold text-secondary-700 mt-36 mb-10">
    ТАКОЖ МОЖЕ СПОДОБАТИСЬ
  </h3>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    {#each data.similarProducts as similarProduct}
      <ProductCard product={similarProduct} />
    {/each}
  </div>
</div>
