<script lang="ts">
  import type { HomeBanner } from "../../routes/(all)/+page"

  export let banners: HomeBanner[]
  const numVisibleBanners = 2
  let startIndexBanners = 0

  let arrowsVisible = false

  function showArrows() {
    arrowsVisible = true
  }

  function hideArrows() {
    arrowsVisible = false
  }

  function scrollItems(
    startIndex: number,
    numVisible: number,
    items: any[],
    delta: number
  ) {
    startIndex += delta
    if (startIndex < 0) {
      startIndex = Math.max(0, items.length - (items.length % numVisible))
    } else if (startIndex >= items.length) {
      startIndex = 0
    }
    return startIndex
  }
</script>

<section
  class="w-full overflow-hidden pb-1/3 flex items-center justify-center mt-20"
  aria-label="Banner Carousel"
  on:mouseover={showArrows}
  on:mouseout={hideArrows}
  on:focus={showArrows}
  on:blur={hideArrows}
>
  <div class="mt-20">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex items-center justify-center">
      <div class="w-full overflow-x-hidden overflow-y-hidden mx-12">
        <div class="grid grid-cols-2 gap-4">
          {#each banners.slice(startIndexBanners, startIndexBanners + numVisibleBanners) as banner}
            <div
              class="product-card my-2 rounded-md flex flex-col items-center w-full mb-2"
            >
              <img
                class="max-h-96 object-contain mb-2"
                src={banner.url}
                alt="Product Banner"
                width="600"
                height="250"
                loading="lazy"
              />
            </div>
          {/each}
        </div>
      </div>
      <div>
        <button
          class="absolute left-0 ml-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
          on:click={() =>
            (startIndexBanners = scrollItems(
              startIndexBanners,
              numVisibleBanners,
              banners,
              -1
            ))}
         class:hidden={!arrowsVisible} >
          &#60;
          </button
        >
        <button
          class="absolute right-0 mr-7 mt-1/2 -translate-y-1/2 focus:outline-none hover:bg-gray-200"
          on:click={() =>
            (startIndexBanners = scrollItems(
              startIndexBanners,
              numVisibleBanners,
              banners,
              1
            ))}
          class:hidden={!arrowsVisible} >
          &#62;
        </button>
      </div>
    </div>
  </div>
</section>
