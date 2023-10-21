<script lang="ts">
  import { CartDialogContent, CartIcon } from "$features/cart"
  import { call } from "$lib"
  import Dialog from "$lib/components/Dialog.svelte"
  import type { LayoutData } from "./$types"

  export let data: LayoutData

  let cartOpen = false
  function toggleCartDialog() {
    cartOpen = !cartOpen
  }

  let email = ""
  const defaultEmailMessage =
    "Підписуючись, я згоден з умовами та політикою конфіденційності."
  let emailMessage = defaultEmailMessage
  async function subscribe() {
    const response = await call(fetch, {
      route: "/v1/shop/subscribe",
      method: "POST",
      body: {
        email: email,
        shopId: data.shop.id
      }
    })
    if (!response) {
      emailMessage = "Не можемо підписати зараз."
    } else if (response.ok) {
      email = ""
      emailMessage = defaultEmailMessage
    } else if (response.status == 400) {
      emailMessage = "E-mail не коректний"
    } else {
      emailMessage = "Не можемо підписати зараз."
    }
  }
</script>

<header class="border-b border-b-lines">
  <nav class="container-xl px-6 grid grid-cols-4 gap-4 items-center h-14">
    <a href="/" class="font-bold text-xl text-secondary-600">
      {data.shop?.name}
    </a>

    <div class="col-span-2 flex items-center justify-between h-full">
      <div class="h-5 w-px bg-lines self-end" />
      <a href="/catalog" class="text-secondary-700 font-medium">КАТАЛОГ</a>
      <a href="/about" class="text-secondary-600">ПРО НАС</a>
      <div class="h-5 w-px bg-lines self-end" />
    </div>

    <div class="flex justify-end items-center h-full">
      <!-- <button class="border border-secondary-300 rounded-full p-1 w-full">
        Search
      </button> -->
      <button on:click={toggleCartDialog} class=" h-full" aria-label="Корзина">
        <CartIcon />
      </button>
    </div>
  </nav>
</header>

<Dialog class="flex justify-end items-start" bind:open={cartOpen}>
  <CartDialogContent accentColor={data.shop.accentColor} close={() => (cartOpen = false)} />
</Dialog>

<slot />

<footer class="bg-white border-t border-lines pt-16 pb-12">
  <div class="container-xl px-6">
    <div class="grid grid-cols-3 gap-4 place-items-center">
      <div class="justify-self-start">
        <h3 class="font-bold text-secondary-600 text-2xl">ПІДПИСАТИСЯ</h3>

        <form
          class="flex justify-between items-center gap-4 border-b border-b-lines mt-4 w-full"
          on:submit={subscribe}
        >
          <input
            type="email"
            bind:value={email}
            class="py-2 w-full"
            placeholder="Електронна пошта"
          />
          <button type="submit" class="font-semibold text-secondary-500"
            >ВІДПРАВИТИ</button
          >
        </form>
        <p class="break-words text-secondary-500">{emailMessage}</p>
      </div>
      <div class="flex gap-2">
        <span>Каталог</span>
        <span>Про нас</span>
      </div>
      <div class="justify-self-end flex flex-col">
        <span class="text-secondary-400">КОНТАКТИ</span>
      </div>
    </div>

    <div class="border-t border-lines flex justify-between mt-16">
      <span>Copyright 2023. {data.shop?.name}</span>
      <a href="/legal">Легальні документи</a>
    </div>
  </div>
</footer>
