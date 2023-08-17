<script lang="ts">
  export let color: `#${string}` = "#6b7280"
  let className: string = "w-6 h-6"
  export { className as class }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke={color}
  class={className}
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
