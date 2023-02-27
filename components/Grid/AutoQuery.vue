<script setup lang="ts">
import type { QueryItem } from "~/types";

const props = defineProps<{
  query: QueryItem;
}>();

const item = await listMedia(props.query.type, props.query.query, 1, 12);
</script>

<template>
  <GridBase>
    <template #title>
      <div class="flex flex-col">
        <span class="text-4xl font-bold text-gray-800 dark:text-gray-100"
          >Recent books</span
        >
        <span class="mb-4 inline-block h-0.5 w-20 rounded bg-green-700"></span>
      </div>
    </template>
    <template #more>
      <div class="flex justify-end text-xl font-bold text-blue-400 leading-6">
        <NuxtLink
          :to="`/${query.type}/`"
          class="p-4"
          aria-label="all posts"
        >
          {{ $t("See all") }}
          &rarr;
        </NuxtLink>
      </div>
    </template>
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4 xl:grid-cols-6">
      <div v-for="i in item.data" :key="i._id">
        <MediaBook :item="i" :type="query.type" />
      </div>
    </div>
  </GridBase>
</template>
