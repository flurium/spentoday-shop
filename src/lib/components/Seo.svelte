<script lang="ts">
  export let shop: string
  export let domain: string
  export let title: string = ""
  export let description: string
  export let images: string[] = []
</script>

<svelte:head>
  <title>{title == "" ? shop : `${title} | ${shop}`}</title>
  <meta name="description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="og:title" content={`${title} | ${shop}`} />
  <meta property="og:site_name" content={shop} />
  <meta property="og:url" content={domain} />
  <meta property="og:description" content={description} />
  {#if images.length > 0}
    <meta property="og:image" content={images[0]} />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="uk" />
  <meta property="og:image:alt" content={title} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>
