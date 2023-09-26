<script lang="ts">
  import { cart } from "$features/cart"
  import Minus from "$features/cart/ui/Minus.svelte"
  import Plus from "$features/cart/ui/Plus.svelte"
  import Close from "$features/cart/ui/Close.svelte"
  import { call } from "$lib/fetch"
  import type { PageData } from "../$types"
  import { goto } from "$app/navigation"

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
      class="bg-yellow-400 w-2/5 mx-auto hover:bg-yellow-300 font-semibold px-6 py-3 rounded-full"
      on:click={() => exit()}
      type="submit"
    >
      На головну
    </button>
  </div>
</dialog>

<div class="mt-16">
  <div class="flex flex-row">
    <div class="basis-1/2 ms-16">
      <span
        class="mb-10 text-5xl font-bold max-w-lg flex flex-col gap-4 text-transform: uppercase"
      >
        Оформлення
      </span>
      <div
        class="mb-10 w-full text-2xl font-extrabold border-b-2 border-gray-400"
      >
        <span class="bg-yellow rounded-full">1</span>
        <span class=""> Контакна інформація</span>
      </div>

      <div class="w-2/5 flex flex-col mt-2 mb-8">
        <input
          class="bg-gray-100 focus:bg-gray-50 px-6 py-4 border-b-2 border-gray-400"
          bind:value={fullName}
          placeholder="Ваш ПІБ(Прізвище ім'я по батькові)"
        />
        <input
          class="bg-gray-100 focus:bg-gray-50 px-6 py-4 border-b-2 border-gray-400"
          bind:value={email}
          placeholder="email"
        />
        <input
          class="bg-gray-100 focus:bg-gray-50 px-6 py-4 border-b-2 border-gray-400"
          bind:value={phone}
          placeholder="номер телефону"
        />
      </div>
      <div
        class="mb-10 w-full text-2xl font-extrabold border-b-2 border-gray-400"
      >
        <span class="mb-5 rounded-full">2</span>
        Деталі доставки
      </div>
      <div class="w-2/5 flex flex-col gap-2 mt-2">
        <input
          class="bg-gray-100 focus:bg-gray-50 px-6 py-4 border-b-2 border-gray-400"
          bind:value={adress}
          placeholder="адреса(країна, область, місто, вулиця, дім/квартира)"
        />
        <input
          class="bg-gray-100 focus:bg-gray-50 px-6 py-4 border-b-2 border-gray-400"
          bind:value={postIndex}
          placeholder="поштовий індекс"
        />
        <textarea
          class="bg-gray-100 h-56 focus:bg-gray-50 px-6 py-4 border border-gray-400"
          bind:value={comment}
          placeholder="Залиште свій коментар для замовлення"
        />
        <button
          class="bg-yellow-400 disabled:bg-secondary-300 hover:bg-yellow-300
          font-semibold px-6 py-3 rounded-full"
          on:click={() => order()}
          type="submit"
          disabled={isInvalid}
        >
          Замовити
        </button>
      </div>
    </div>

    <div class="basis-1/2 m-11">
      <div class="bg-white p-6">
        <span class="mb-4 text-xl font-bold"> Ваше замовлення </span>
        {#each $cart as product (product.id)}
          <div
            class="grid grid-cols-[1fr_1fr_1fr_auto] w-full
              border-t border-t-lines pt-5 mb-8"
          >
            <div class="flex gap-3 items-center">
              {#if product.image}
                <img
                  class="h-32 w-32 border border-lines"
                  src={product.image}
                  alt={product.name}
                />
              {/if}
              <h4 class="font-semibold text-secondary-700">{product.name}</h4>
            </div>

            <div
              class="place-self-center grid grid-cols-3 place-items-center w-fit
                border border-lines rounded-full"
            >
              <button
                on:click={() => changeAmount(product.id, 1)}
                class="border-r border-r-lines h-full grid place-items-center"
              >
                <Plus />
              </button>
              <span class=" text-lg font-semibold">{product.amount}</span>
              <button
                on:click={() => changeAmount(product.id, -1)}
                class="border-l border-l-lines h-full grid place-items-center"
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
        <span class="mb-4 text-2xl font-bold">Сума {sum} грн</span>
      </div>
    </div>
  </div>
</div>
