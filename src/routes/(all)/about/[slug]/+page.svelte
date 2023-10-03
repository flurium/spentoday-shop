<script lang="ts">
  import type { PageData } from "./$types"
  import Markdown from "$features/Markdown.svelte"

  export let data: PageData
  let infoData = data.infoPage;
</script>


<div>
    <Markdown content={infoData.content}/>
</div>