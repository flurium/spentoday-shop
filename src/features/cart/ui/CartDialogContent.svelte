<script lang="ts">
  import { cart } from ".."
  import Plus from "./Plus.svelte"
  import Minus from "./Minus.svelte"
  import Close from "./Close.svelte"

  export let onClose: () => void

  function changeAmount(id: string, num: number) {
    cart.changeAmount(id, num)
  }

  function remove(id: string) {
    cart.remove(id)
  }
</script>

<div class="w-full max-w-5xl m-12 bg-white p-12">
  <div class="flex justify-between">
    <h3 class="text-4xl text-secondary-700 font-bold">КОШИК ({$cart.length})</h3>
    <button on:click={onClose}><Close color="#3f3f46" class="w-8 h-8" /></button>
  </div>

  
  {#if $cart.length > 0}
    <div
      class="grid grid-cols-[1fr_1fr_1fr_auto] place-items-center w-full
      text-secondary-500 font-semibold text-sm mt-10 pb-3"
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
            border border-lines rounded-full"
        >
          <button
            on:click={() => changeAmount(product.id, 1)}
            class="p-3 border-r border-r-lines h-full grid place-items-center"
          >
            <Plus />
          </button>
          <span class="px-3 text-lg font-semibold">{product.amount}</span>
          <button
            on:click={() => changeAmount(product.id, -1)}
            class="p-3 border-l border-l-lines h-full grid place-items-center"
          >
            <Minus />
          </button>
        </div>

        <span class="place-self-center text-secondary-700">
          {product.price * product.amount} грн.
        </span>

        <button on:click={() => remove(product.id)}><Close /></button>
      </div>
    {/each}
    
    <div class="grid place-items-center">
      <a href="/order"> Замовити</a>
    </div>
  {/if}
</div>
