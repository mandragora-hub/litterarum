<script setup lang="ts">
import type { Book } from "~/types";

const { t } = useI18n();
const app = useAppConfig();

// it should not be used here. Change this when create services folder.
const { loading: globalLoading } = useGlobalFetchLoading(); 

const el = ref<HTMLElement | null>(null); // remote this line.
onMounted(() => {
  useInfiniteScroll(window, () => loadMore());
});

const books = ref<Book[] | undefined>();
const pages = ref(1);
const { data: initialData } = await searchBooks("", pages.value, 10);
books.value = initialData.value?.data;

const loadMore = async () => {
  if (initialData.value!.meta.totalPages <= pages.value) return;

  pages.value++;
  const { data: result } = await searchBooks("", pages.value, 10);
  books.value?.push(...result.value!.data);
};

useSeoMeta({
  title: `Listado de libros 📚️ - ${app.name}`,
  ogTitle: `Listado de libros 📚️ - ${app.name}`,
  description: app.description,
  ogDescription: app.description,
  ogImage:
    "https://www.nicepng.com/png/full/6-66634_open-book-logo-png-sketch.png",
  twitterDescription: app.description,
  twitterTitle: `Listado de libros 📚️ - ${app.name}`,
  twitterImage:
    "https://www.nicepng.com/png/full/6-66634_open-book-logo-png-sketch.png",
});
</script>
<template>
  <div>
    <header class="mb-4">
      <h1 class="text-4xl font-bold">
        {{ t("pages.bookIndex.header") }}
        <span role="img" alt="hello"> 📖️ </span>
      </h1>
      <p class="text-lg">
        {{ t("pages.bookIndex.subtitle") }}
      </p>
    </header>
    <div
      v-if="initialData?.meta.count"
      ref="el"
      class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5"
    >
      <MediaBook v-for="i in books" :key="i._id" :item="i" />
    </div>
    <UIcon
      class="mx-auto w-full transition-opacity mt-2"
      :class="{
        'opacity-100': globalLoading,
        'opacity-0 duration-500': !globalLoading,
      }"
      name="i-svg-spinners-180-ring"
      dynamic
    />
  </div>
</template>
