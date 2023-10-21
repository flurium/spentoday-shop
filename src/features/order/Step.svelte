<script lang="ts">
  export let accentColor: String
</script>

<span
  class="h-8 w-8 grid place-content-center font-semibold text-secondary-700 rounded-full"
  style={`background-color: ${accentColor};`}
>
  <slot />
</span>
