<script lang="ts">
  export let open: boolean = false

  let className: string = ""
  export { className as class }

  let backElement: HTMLDivElement
  function clickOutside(e: MouseEvent) {
    if (e.target === backElement) {
      open = false
    }
  }

  function escape(e: KeyboardEvent) {
    if (e.key == "Escape") {
      open = false
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    bind:this={backElement}
    class="absolute z-10 w-full top-0 bottom-0
     bg-secondary-700 bg-opacity-75 {className}"
    on:click={clickOutside}
    on:keyup={escape}
  >
    <slot />
  </div>
{/if}
