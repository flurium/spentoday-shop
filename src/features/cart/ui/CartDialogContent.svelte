<script lang="ts">
  import { cart } from ".."
  import Plus from "./Plus.svelte"
  import Minus from "./Minus.svelte"
  import Close from "./Close.svelte"
  import Dialog from "$lib/components/Dialog.svelte"

  function changeAmount(id: string, num: number) {
    cart.changeAmount(id, num)
  }

  function remove(id: string) {
    cart.remove(id)
  }
</script>

<div class="h-[1000px] w-full max-w-4xl m-12 bg-white p-12">
  <h3 class="text-4xl text-secondary-700 font-bold">КОШИК ({$cart.length})</h3>

  {#if $cart.length > 0}
    <div
      class="grid grid-cols-[1fr_1fr_1fr_auto] place-items-center w-full
      text-secondary-500 font-semibold text-sm mt-10"
    >
      <span>Товар</span>
      <span>Кількість</span>
      <span>Ціна</span>
      <div class="h-6 w-6" />
    </div>

    {#each $cart as product (product.id)}
      <div
        class="grid grid-cols-[1fr_1fr_1fr_auto] w-full
          border-t border-t-lines pt-5 mb-8"
      >
        <div class="flex gap-3 items-center">
          {#if product.image}
            <img class="h-32 w-32 border border-lines" src={product.image} alt={product.name} />
          {/if}
          <h4 class="font-semibold text-secondary-700">{product.name}</h4>
        </div>

        <div
          class="place-self-center grid grid-cols-3 place-items-center w-fit
            border border-gray-400 rounded-full"
        >
          <button
            on:click={() => changeAmount(product.id, 1)}
            class="p-3 border-r border-r-gray-400 h-full grid place-items-center"
          >
            <Plus />
          </button>
          <span class="px-3 text-lg font-semibold">{product.amount}</span>
          <button
            on:click={() => changeAmount(product.id, -1)}
            class="p-3 border-l border-l-gray-400 h-full grid place-items-center"
          >
            <Minus />
          </button>
        </div>

        <span class="place-self-center">{product.price * product.amount}</span>

        <button on:click={() => remove(product.id)}><Close /></button>
      </div>
    {/each}

    <button class="rounded-full border border-lines py-7 px-11">Оформити замовлення</button>
  {/if}
</div>
