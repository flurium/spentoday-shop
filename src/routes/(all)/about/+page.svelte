<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 p-4 mt-16 mx-6">
  <p class="text-7xl font-bold text-secondary-700 mb-10">ПРО НАС</p>
  <ul class="flex flex-col gap-3.5 w-full mb-10">
    {#each data.infoData as infoData, i}
      <li
        class="py-3 border-b border-b-secondary-400 text-secondary-700
        hover:text-secondary-900 hover:border-b-secondary-900 flex justify-between items-center"
      >
        <a href="/about/{infoData.slug}" class="flex justify-between items-center w-full">
          <div>
            <span class="text-xl italic">
              {i > 9 ? { i } : String(i + 1).padStart(2, "0")}
            </span>
            <span class="text-2xl ml-4 font-semibold">
              {infoData.title}
            </span>
          </div>
          <span class="text-2xl text-secondary-400">&#129125;</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
