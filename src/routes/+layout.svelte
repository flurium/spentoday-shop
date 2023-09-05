<script lang="ts">
  import "../app.css"
</script>

<header class="border-b border-b-lines">
  <nav class="container-xl px-6 grid grid-cols-10 gap-4 items-center h-14">
    <a href="/" class="font-bold text-xl text-secondary-600 col-span-2">{data.shop.name}</a>

    <div class="col-span-4 flex items-center justify-between h-full">
      <div class="h-5 w-px bg-lines self-end" />
      <a href="/catalog" class="text-secondary-700 font-medium">КАТАЛОГ</a>
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
