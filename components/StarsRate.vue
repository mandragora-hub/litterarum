<script setup lang="ts">
import type { Book } from "~/types";
const props = defineProps<{
  book: Book;
}>();

const bookRating = await getBookRatingByTitle(props.book?.title);

const bookPostedDate = computed(() => {
  const parse = new Date(props.book.createdAt || Date.now());
  const intl = new Intl.DateTimeFormat("es-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parse);
  return intl.toString();
});
</script>

<template>
  <div class="flex items-center italic" :class="$attrs.class">
    <p>
      Publicado por
      <span class="text-blue-400 cursor-pointer">Litterarum</span> en el
      {{ bookPostedDate }}
    </p>
    <span
      class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
    ></span>

    <UIcon
      v-if="bookRating?.rating"
      name="i-ph-star-fill"
      class="text-yellow-500"
    />
    <!-- <UIcon v-else name="i-ph-star" class="text-yellow-500" /> -->
    <p v-if="bookRating?.rating" class="ml-2 font-bold dark:text-white">
      {{ bookRating.rating }}
    </p>
    <span
      v-if="bookRating?.rating"
      class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
    ></span>

    <NuxtLink to="#disqus_thread" class="font-normal text-blue-400">
      <DisqusCount :identifier="`/book/${book._id}`"
    /></NuxtLink>
  </div>
</template>
