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

const cleanUrl = (url: string) => {
  // doing this we avoid the mixed content error in modern browsers
  const urlObj = new URL(url);

  if (urlObj.protocol === "http:") {
    urlObj.protocol = "https:";
  }

  return urlObj.toString();
};
</script>

<template>
  <NuxtLink :to="`/${type}/${item.slug}`" class="w-full h-full p-2">
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
