<script lang="ts">
  import { storageImageUrl } from "$lib"
  import type { Product } from "."

  export let product: Product

  let className = ""
  export { className as class }
</script>

<a
  href="/catalog/{product.slug == '' ? product.id : product.slug}"
  class={className}
>
  {#if product.image}
    <img
      class="w-full border border-lines"
      src={storageImageUrl(product.image)}
      alt={product.name}
    />
  {:else}
    <div class="w-full border border-lines aspect-square" />
  {/if}

  <h3 class="font-semibold text-xl text-secondary-700">{product.name}</h3>
  {#if product.isDiscount}
    <p class="reak-words whitespace-normal text-secondary-600 text-20">
      {product.discountPrice} грн.
      <sup class="text-secondary-400 line-through">{product.price}</sup>
    </p>
  {:else}
    <p class="reak-words whitespace-normal text-secondary-600 text-20">
      {product.price} грн.
    </p>
  {/if}
</a>
