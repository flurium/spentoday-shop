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

  <h3 class="font-semibold text-xl">{product.name}</h3>
  <p>{product.price} грн</p>
</a>
