<script lang="ts">
  import type { PageData } from "./$types"
  import Markdown from "$features/Markdown.svelte"

  export let data: PageData
  let infoData = data.infoPage;
</script>

<div>
  <div class="border-b-2 border-b-secondary-400 mx-14 flex items-center justify-between">
    <h1 class="text-8xl text-secondary-700 font-semibold my-6">{infoData.title}</h1>
    <span class="mt-8">Дата редагування: {infoData.time}</span>
  </div>
  <Markdown content={infoData.content}/>
</div>
