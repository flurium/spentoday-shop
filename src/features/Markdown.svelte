<script lang="ts">
  import { unified } from "unified"
  import remarkParse from "remark-parse"
  import remarkGfm from "remark-gfm"
  import remarkHtml from "remark-html"

  export let content: string

  $: md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content)
    .then((x) => x.toString())
</script>

<div class="content m-14 text-secondary-700">
  {#await md then html}
    {@html html}
  {/await}
</div>

<style lang="postcss">
  .content :global(h1) {
    @apply mb-12 text-8xl font-bold;
  }
  .content :global(h2) {
    @apply mt-8 mb-4 text-6xl font-semibold;
  }
  .content :global(h3) {
    @apply mt-6 mb-4 text-4xl font-semibold;
  }
  .content :global(p),
  .content :global(ul),
  .content :global(ol) {
    @apply mb-4;
  }
  .content :global(ul) {
    @apply list-none list-inside text-xl my-5;
     padding-left: 2rem;
     margin-top: 1rem;
  }
  .content :global(ol) {
    @apply list-decimal list-inside text-xl my-5;
    padding-left: 2rem; 
    margin-top: 1rem;
  }

  .content :global(li) {
    @apply mb-2;
    line-height: 2; 
    
  }

  .content :global(ul li::before) {
    content: '\2013'; 
    left: -1.25rem; 
    top: 0.25rem; 
    font-size: 1.25rem;
  }

  
  .content :global(a) {
    @apply text-lg;
     text-decoration: underline;
  }

   .content :global(a:hover) {
    text-decoration: none; 
  }

  .content :global(pre) {
    @apply rounded-md p-4;
  }
  .content :global(blockquote) {
    @apply p-4 my-4 border-l-4 border-gray-300 bg-gray-50;
  }
</style>
