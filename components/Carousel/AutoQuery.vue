<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import type { QueryItem } from "~/types";

const props = defineProps<{
  query: QueryItem;
}>();

const item = await listMedia(props.query.type, props.query.query, 1);

const defaultSettings = {
  itemsToShow: 2,
  snapAlign: "start",
};
const breakpoints = {
  700: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  1024: {
    itemsToShow: 6,
    snapAlign: "start",
  },
};
</script>

<template>
  <CarouselBase>
    <template #title>
      {{ $t(query.title) }}
    </template>
    <template #more>
      <NuxtLink
        class="opacity-50 hover:(opacity-50 text-primary) transition"
        :to="`/${query.type}/category/${query.query}`"
      >
        {{ $t("Explore more") }}
      </NuxtLink>
    </template>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <Carousel :settings="defaultSettings" :breakpoints="breakpoints">
        <Slide v-for="i in item.data" :key="i._id">
          <MediaBook :item="i" :type="query.type" />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </ClientOnly>
  </CarouselBase>
</template>
