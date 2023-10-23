<script lang="ts">
  export let link: string
  export let title: string
  export let index: number
</script>

<a
  href={link}
  class="grid grid-cols-[auto_1fr_auto] gap-4 py-3 mb-3
  border-b border-b-lines text-secondary-700 items-center"
>
  <span class="text-xl italic">
    {index > 9 ? { index } : String(index + 1).padStart(2, "0")}
  </span>
  <span class="text-2xl font-semibold">
    {title}
  </span>
  <span class="text-2xl text-secondary-400 justify-self-end">&#129125;</span>
</a>
