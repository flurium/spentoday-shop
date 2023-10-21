<script lang="ts">
  export let phrases: string[]
</script>

<div
  class="overflow-hidden text-lg font-semibold text-secondary-500 border-y border-lines
      flex justify-around items-center"
>
  <div class="moving flex items-center pr-6">
    {#each phrases as phrase, i}
      <div class="whitespace-nowrap py-4 uppercase">
        {phrase}
        {#if i != phrases.length - 1}
          <span class="px-6 items-center">/</span>
        {/if}
      </div>
    {/each}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/
  </div>

  <div class="moving flex items-center pr-6">
    {#each phrases as phrase, i}
      <div class="whitespace-nowrap py-4 uppercase">
        {phrase}
        {#if i != phrases.length - 1}
          <span class="px-6 items-center">/</span>
        {/if}
      </div>
    {/each}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/
  </div>

  <div class="moving flex items-center pr-6">
    {#each phrases as phrase, i}
      <div class="whitespace-nowrap py-4 uppercase">
        {phrase}
        {#if i != phrases.length - 1}
          <span class="px-6 items-center">/</span>
        {/if}
      </div>
    {/each}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/
  </div>
</div>

<style>
  .moving {
    animation: slide 15s linear infinite;
  }

  @keyframes slide {
    0% {
      transform: translateX(50%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
