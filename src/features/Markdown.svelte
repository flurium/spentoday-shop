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

<div class="content text-secondary-700">
  {#await md then html}
    {@html html}
  {/await}
</div>

<style lang="postcss">
  :global(.content) {
    @apply break-words;
  }

  .content :global(h1) {
    @apply mb-12 text-5xl font-bold;
  }

  .content :global(h2) {
    @apply mt-8 mb-4 text-3xl font-semibold;
  }

  .content :global(h3) {
    @apply mt-6 mb-4 text-2xl font-semibold;
  }

  .content :global(ul) {
    @apply list-disc list-inside my-5;
  }

  .content :global(ol) {
    @apply list-decimal list-inside my-5;
  }

  .content :global(li) {
    @apply mb-4;
  }

  .content :global(li p) {
    @apply inline;
  }

  .content :global(img) {
    @apply m-auto my-16 border border-lines;
  }

  .content :global(table) {
    @apply table-auto w-full border-collapse border border-lines;
  }

  .content :global(th),
  .content :global(td) {
    @apply border border-lines text-left p-3;
  }

  .content :global(hr) {
    @apply my-6;
  }

  .content :global(a) {
    @apply decoration-secondary-500;
    text-decoration: underline;
  }

  .content :global(pre) {
    @apply rounded-md p-4;
  }

  .content :global(blockquote) {
    @apply p-4 my-4 border-l-4 border-secondary-300;
  }
</style>
