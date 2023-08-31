<script lang="ts">
    import { cart } from "$features/cart"
    import { call, callJson } from "$lib/fetch"
    import type { PageData } from "../$types"
  
    export let data: PageData
    let adress:string = ""
    let phone:string = ""
    let email:string = ""
    let fullName:string = ""
    let postIndex:string = ""
    let comment:string = ""
    $: isInvalid = adress.trim() == "" || phone.trim() == "" || email.trim() == "" || fullName.trim() == "" || postIndex.trim() == "" || comment.trim() == ""
 
    async function order() {
    const orders = $cart
    const response = await call(fetch,{
      route: `/v1/shop/order/${data.domain}/new`,
      method: "POST",
      body: {
        email:email,
        phone: phone,
        adress:adress,
        fullName:fullName,
        postIndex:postIndex,
        comment:comment,
        orders: orders
      }
    })
    if (!response) return alert("no server response")

    if (response.ok) {
      cart.clear()
      console.log("order is sent")
      return alert("orderis sent")

    }
  }
  </script>

<form on:submit|preventDefault={order} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input
    class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
    bind:value={fullName}
    placeholder="Ваш ПІБ(Прізвище ім'я по батькові)"
  />
  <input
  class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
  bind:value={email}
  placeholder="email"
  />
  <input
  class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
  bind:value={phone}
  placeholder="номер телефону"
  />
  <input
  class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
  bind:value={adress}
  placeholder="адреса(країна, область, місто, вулиця, дім/квартира)"
  />
  <input
  class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
  bind:value={postIndex}
  placeholder="поштовий індекс"
  />
  <textarea
  class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
  bind:value={comment}
  placeholder="Залиште свій коментар для замовлення"
  />
  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-yellow
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
    disabled={isInvalid}
  >
    Замовити
  </button>
</form>


  