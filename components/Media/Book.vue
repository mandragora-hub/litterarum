<script setup lang="ts">
import type { Book, MediaType } from "~/types";

withDefaults(
  defineProps<{
    type?: MediaType;
    item: Book;
  }>(),
  {
    type: "books",
  }
);

</script>

<template>
  <NuxtLink :to="`/${type}/${item.slug}`" class="w-full h-full">
    <MediaBookCover class="block" :src="item.coverUrl" />
    <div class="text-left mt-2">
      <h5>{{ item.title }}</h5>
      <p class="text-gray-600">
        {{ item.author ? item.author.name : "Anónimo" }}
      </p>
    </div>
    <Rating :value="item.downloaded" />
  </NuxtLink>
</template>
