<script lang="ts">
  import { CartDialogContent, CartIcon } from "$features/cart"
  import Dialog from "$lib/components/Dialog.svelte"
  import "../app.css"

  let cartOpen = false
  function toggleCartDialog() {
    cartOpen = !cartOpen
  }

  let name: string = "Cloth."
</script>

<header class="border-b border-b-lines">
  <nav class="container-xl px-6 grid grid-cols-10 gap-4 items-center h-14">
    <a href="/" class="font-bold text-xl text-secondary-600 col-span-2">{name}</a>

    <div class="col-span-4 flex items-center justify-between h-full">
      <div class="h-5 w-px bg-lines self-end" />
      <a href="/search" class="text-secondary-700 font-medium">КАТАЛОГ</a>
      <a href="/about" class="text-secondary-500">ПРО НАС</a>
      <div class="h-5 w-px bg-lines self-end" />
    </div>

    <div class="col-span-4 flex gap-4">
      <button class="border border-secondary-300 rounded-full p-1 w-full">Search</button>
      <button on:click={toggleCartDialog}><CartIcon /></button>
    </div>
  </nav>
</header>

<Dialog class="flex justify-end items-start" bind:open={cartOpen}>
  <CartDialogContent onClose={() => (cartOpen = false)} />
</Dialog>

<slot />

<footer class="bg-white border-t border-lines pt-16 pb-12">
  <div class="container-xl px-6">
    <div class="grid grid-cols-3 gap-4 place-items-center">
      <div class="justify-self-start">
        <h3 class="font-bold text-secondary-500 text-2xl">НАША РОЗСИЛКА</h3>
      </div>
      <div class="flex gap-2">
        <span>Каталог</span>
        <span>Про нас</span>
      </div>
      <div class="justify-self-end flex flex-col">
        <span class="text-secondary-400">КОНТАКТИ</span>
      </div>
    </div>

    <div class="border-t border-lines flex justify-between">
      <span>Copyright 2023. {name}</span>
      <a href="/legal">Легальні документи</a>
    </div>
  </div>
</footer>
