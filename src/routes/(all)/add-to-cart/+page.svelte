<script lang="ts">
  import { cart } from "$features/cart"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

{#each data.products as product}
  <div class="flex flex-col gap-2 mb-12">
    <span>{product.id}</span>
    <span>{product.name}</span>
    <span>{product.price}</span>
    <span>{product.shopId}</span>

    {#if $cart.some((x) => x.id == product.id)}
      <button on:click={() => cart.remove(product.id)}>Remove from cart</button>
    {:else}
      <button
        on:click={() =>
          cart.add({
            id: product.id,
            name: product.name,
            price: product.price,
            amount: 1
          })}
        class="p-2 bg-purple-300"
      >
        Add to cart
      </button>
    {/if}
  </div>
{/each}
