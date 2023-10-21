<script lang="ts">
  import { cart } from "$features/cart"
  import Close from "$features/cart/ui/Close.svelte"
  import { call } from "$lib/fetch"
  import type { PageData } from "../$types"
  import { goto } from "$app/navigation"
  import Step from "$features/order/Step.svelte"

  export let data: PageData
  let adress = ""
  let phone = ""
  let email = ""
  let fullName = ""
  let postIndex = ""
  let comment = ""
  let modal: HTMLDialogElement

  $: sum = $cart.reduce((s, x) => s + x.price * x.amount, 0)

  $: isInvalid =
    adress.trim() == "" ||
    phone.trim() == "" ||
    email.trim() == "" ||
    fullName.trim() == "" ||
    postIndex.trim() == "" ||
    comment.trim() == ""

  async function order() {
    const products = $cart
    const response = await call(fetch, {
      route: `/v1/shop/order/${data.domain}/new`,
      method: "POST",
      body: {
        email: email,
        phone: phone,
        adress: adress,
        fullName: fullName,
        postIndex: postIndex,
        comment: comment,
        products: products
      }
    })
    if (!response) {
      return
    }

    if (response.ok) {
      cart.clear()
      modal.showModal()
    }
  }

  function changeAmount(id: string, num: number) {
    cart.changeAmount(id, num)
  }

  function remove(id: string) {
    cart.remove(id)
  }

  function exit() {
    modal.close()
    goto("/")
  }
</script>

<dialog bind:this={modal} class="p-10 bg-white rounded-md">
  <div class="flex flex-col">
    <div class="text-3xl center mx-auto">ДЯКУЄМО ЗА ЗАМОВЛЕННЯ</div>
    <br />
    <div class="text-sm center mx-auto">
      Оплата пройшла успішно, очікуйте на отримання товару.<br />
      Якщо виникнуть проблеми будь ласка, звяжіться з нами
    </div>
    <br />

    <button
      class="font-semibold px-6 py-3 rounded-full" style={`background-color: ${data.shop.accentColor};`}
      on:click={() => exit()}
      type="submit"
    >
      На головну
    </button>
  </div>
</dialog>

<div class="px-12 pt-20 pb-32">
  <h1 class="text-6xl font-extrabold text-secondary-700 mb-14">ОФОРМЛЕННЯ</h1>

  <div class="flex flex-col-reverse lg:flex-row gap-10">
    <section class="basis-1/2">
      <h3 class="flex items-center gap-5 border-b border-b-lines pb-3">
        <Step accentColor={data.shop.accentColor}>1</Step>
        <span class="text-secondary-600 font-bold text-3xl">
          Контакна інформація
        </span>
      </h3>

      <input
        class="block bg-inherit py-2 border-b border-lines w-full mt-8"
        bind:value={fullName}
        placeholder="Введіть ваше повне ім'я"
      />
      <input
        class="block bg-inherit py-2 border-b border-lines w-full mt-8"
        bind:value={email}
        type="email"
        placeholder="E-mail"
      />
      <input
        class="block bg-inherit py-2 border-b border-lines w-full mt-8"
        bind:value={phone}
        type="tel"
        placeholder="Номер телефону"
      />

      <h3 class="flex items-center gap-5 border-b border-b-lines pb-3 mt-12">
        <Step accentColor={data.shop.accentColor}>2</Step>
        <span class="text-secondary-600 font-bold text-3xl">
          Деталі доставки
        </span>
      </h3>

      <input
        class="block bg-inherit py-2 border-b border-lines w-full mt-8"
        bind:value={adress}
        placeholder="Адреса: країна, область, місто, вулиця, дім/квартира"
      />
      <input
        class="block bg-inherit py-2 border-b border-lines w-full mt-8"
        bind:value={postIndex}
        placeholder="Поштовий індекс"
      />
      <textarea
        class="block bg-inherit py-2 px-3 border border-lines w-full mt-8"
        bind:value={comment}
        rows="7"
        placeholder="Залиште свій коментар для замовлення"
      />

      <button
        class=" disabled:bg-secondary-300 
         font-semibold px-20 text-secondary-700 py-6 rounded-full mt-12"
        style={`background-color: ${data.shop.accentColor};`}
        on:click={() => order()}
        type="submit"
        disabled={isInvalid}
      >
        Підтвердити покупку
      </button>
    </section>
    <section class="basis-1/2">
      <div class="bg-white p-7 border border-lines">
        <h3 class="text-secondary-700 mb-7 text-xl font-bold">
          Ваше замовлення
        </h3>

        {#each $cart as product (product.id)}
          <div class="grid grid-cols-[auto_1fr_auto] mb-5 gap-4">
            {#if product.image}
              <img
                class="h-32 w-32 border border-lines"
                src={product.image}
                alt={product.name}
              />
            {:else}
              <div />
            {/if}

            <div class="flex flex-col justify-between py-3">
              <h4 class="font-semibold text-lg text-secondary-700">
                {product.name}
              </h4>

              <span class="text-secondary-500">
                {product.price * product.amount} грн.
              </span>
            </div>

            <button on:click={() => remove(product.id)}><Close /></button>
          </div>
        {/each}

        <div class="flex justify-between mb-2 mt-8">
          <span class="text-2xl font-bold text-secondary-600">
            Сума замовлення
          </span>
          <span class="text-2xl font-bold text-secondary-600">{sum} грн</span>
        </div>
      </div>
    </section>
  </div>
</div>
