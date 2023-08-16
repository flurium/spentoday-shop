<script lang="ts">
  import { cart } from ".."
  import Plus from "./Plus.svelte"
  import Minus from "./Minus.svelte"
  import Close from "./Close.svelte"

  function changeAmount(id: string, num: number) {
    cart.changeAmount(id, num)
  }

  function remove(id: string) {
    cart.remove(id)
  }
</script>

<div class="flex flex-col gap-8">
  {#each $cart as product (product.id)}
    <div class="flex justify-between">
      <div>{product.name}</div>

      <div class="grid grid-cols-3 place-items-center border border-gray-400 rounded-full">
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

      <span>{product.price * product.amount}</span>

      <button on:click={() => remove(product.id)}><Close /></button>
    </div>
  {/each}
</div>
