<script setup lang="ts">
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import type { Options } from "@splidejs/vue-splide";
// import "@splidejs/vue-splide/css";
import type { QueryItem } from "~/types";

const props = defineProps<{
  query: QueryItem;
}>();

const item = await listMedia(props.query.type, props.query.query, 1, 10);

// const DEFAULT_ITEMS_TO_SHOW = 2;
// const DEFAULT_SNAP_ALIGN = "start";

const breakpoints = {
  0: {
    perPage: 2,
    gap: 5,
  },
  700: {
    perPage: 3,
    gap: 10,
  },
  1024: {
    perPage: 6,
    gap: 20,
  },
};
const options = reactive<Options>({
  breakpoints,
  rewind: true,
  gap: 20,
  perPage: 6,
});
</script>

<template>
  <ClientOnly>
    <CarouselBase>
      <template #title>
        {{ $t(query.title) }}
      </template>
      <template #more>
        <NuxtLink class="opacity-50 hover:(opacity-50 text-primary) transition">
          {{ $t("components.carousel.explore_more") }}
        </NuxtLink>
      </template>
      <Splide :options="options">
        <SplideSlide v-for="i in item.data" :key="i._id">
          <MediaBook :item="i" :type="query.type" />
        </SplideSlide>
      </Splide>
    </CarouselBase>
  </ClientOnly>
</template>
