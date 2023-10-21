<script lang="ts">
  import ListLink from "$lib/components/ListLink.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<div class="px-4 md:px-6 lg:px-12 py-10">
  <h1 class="text-5xl md:text-7xl font-bold text-secondary-700 mb-10">
    ПРО НАС
  </h1>

  {#each data.infoData as infoData, i}
    <ListLink title={infoData.title} index={i} link="/about/{infoData.slug}" />
  {/each}
</div>
