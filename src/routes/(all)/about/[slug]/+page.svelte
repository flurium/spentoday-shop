<script lang="ts">
  import type { PageData } from "./$types"
  import Markdown from "$features/Markdown.svelte"

  export let data: PageData
  let infoData = data.infoPage
</script>

<div class="px-4 md:px-6 lg:px-12 py-12">
  <h1
    class="text-3xl md:text-5xl lg:text-7xl text-secondary-700 font-bold mb-6"
  >
    {infoData.title}
  </h1>
  <p class="my-8 text-secondary-600">Дата: {infoData.time}</p>

  <Markdown content={infoData.content} />
</div>
