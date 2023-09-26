<script lang="ts">
  import { cart } from "$features/cart"
  import Minus from "$features/cart/ui/Minus.svelte"
  import Plus from "$features/cart/ui/Plus.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  let images = data.product.images
  let amount = 1
  let currentImage = 0

  function changeAmount(arg: number) {
    if (amount == 1 && arg == -1) return
    amount += arg
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

<div class="mt-12 mb-6">
  <div class="flex flex-col-2 gap-6 mb-6">
    <div class="relative ms-12 me-6 basis-1/2">
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

    <div class="grid grid-row-4 gap-4 basis-1/2">
      <h1 class="font-bold text-3xl text-secondary-700">
        {data.product.name}
      </h1>
      <div class="text-xl text-gray-600 m-y-12">
        ₴{data.product.price}грн.
      </div>
      <div class="text-xl text-gray-600 m-y-12">
        {data.product.description}
      </div>
      <div class="flex flex-col-2">
        {#if $cart.some((x) => x.id == data.product.id)}
          <button
            class="px-5 rounded-full border me-4 h-2/5 place-self-center border-gray-400"
            on:click={() => cart.remove(data.product.id)}
            >Видалити з кошику</button
          >
        {:else}
          <button
            on:click={() =>
              cart.add({
                id: data.product.id,
                name: data.product.name,
                price: data.product.price,
                amount: amount
              })}
            class="bg-yellow-400 place-self-center h-2/5 px-6 me-4 rounded-full border border-gray-400"
          >
            Додати до кошику
          </button>
        {/if}
        <div />
        <div
          class="place-self-center grid grid-cols-3 place-items-center w-fit
          border border-lines rounded-full"
        >
          <button
            on:click={() => changeAmount(1)}
            class="p-3 border-r border-r-lines grid place-items-center"
          >
            <Plus />
          </button>

          <span class="px-3 text-lg font-semibold">{amount}</span>

          <button
            on:click={() => changeAmount(-1)}
            class="p-3 border-l border-l-lines grid place-items-center"
          >
            <Minus />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ms-10 me-10 inline-flex">
  {#each images as image}
    <div class="w-32 h-auto px-2 mt-7 border-1">
      <img
        class="w-full h-auto object-contain border border-gray-300 mb-2"
        src={image}
        alt={image}
      />
    </div>
  {/each}
</div>

<div class="ms-10 mt-10 me-10">
  <div class="flex flex-col-3 w-full gap-x-10 border-b border-gray-400">
    <button
      class="border-b px-4 font-bold border-secondary-700 text-secondary-700 bottom-0"
    >
      Опис
    </button>
    <button class="px-4 font-bold text-secondary-500">
      Додаткова інформація
    </button>
    <button class="px-4 font-bold text-secondary-500">Відгуки</button>
  </div>
  <div>{data.product.seoDescription}</div>
</div>

<div class="px-10">
  <h2 class="text-4xl font-bold text-gray-900">
    ТАКОЖ МОЖЕ <br /> СПОДОБАТИСЬ
  </h2>
  <div class="grid grid-cols-4 gap-4">
    {#each data.similarProducts as similarProduct}
      <a
        href="/catalog/{similarProduct.seoSlug == ''
          ? similarProduct.id
          : similarProduct.seoSlug}"
      >
        {#if similarProduct.image != null}
          <div class="w-full h-auto px-2 mt-7 border-rgb-169-167-167 border-1">
            <img
              class="w-full h-auto object-contain border border-gray-300 mb-2"
              src={similarProduct.image}
              alt="Product"
            />
          </div>
        {/if}
        <div class="text-left pl-2">
          <h3
            class="font-inter font-semibold leading-6 tracking-normal text-gray-700 text-20"
          >
            {similarProduct.name}
          </h3>
          <p class="break-words whitespace-normal text-gray-700 text-20">
            {similarProduct.price} грн
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
