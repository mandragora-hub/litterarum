<script setup lang="ts">
import type { Book } from "types";
import { QUERY_LIST } from "~/constants/lists";

const route = useRoute();
const q = route.query.q as string;

const el = ref<HTMLElement | null>(null);
useInfiniteScroll(el, () => loadMore());

const books = ref<Book[] | undefined>();
const pages = ref(1);
const initialData = await searchBooks(q, pages.value, 12);
books.value = initialData.data;

const loadMore = async () => {
  if (initialData.meta.totalPages < pages.value) return;

  pages.value++;
  const result = await searchBooks(q, pages.value, 12);
  books.value?.push(...result.data);
};

const queries = $computed(() => [QUERY_LIST.book[0], QUERY_LIST.book[1]]);

// useHead(() => ({
//   title: capitalize(t('pages.post.title')),
//   meta: [
//     {
//       name: 'description',
//       content: t('pages.post.description'),
//     },
//   ],
// }))
</script>
<template>
  <Container>
    <div class="flex flex-col space-y-5 border-b pb-12">
      <header class="">
        <h1 class="text-4xl">
          {{ capitalize($t("pages.search.results_for")) }}
          <span class="text-slate-500">{{
            `${q} (${initialData.meta.count})`
          }}</span>
        </h1>
        <span class="mb-4 inline-block h-0.5 w-20 rounded bg-slate-700"></span>
      </header>
      <div
        v-if="initialData.meta.count"
        ref="el"
        class="grid grid-cols-2 gap-8 md:grid-cols-4 xl:grid-cols-6"
      >
        <MediaBook v-for="i in books" :key="i._id" :item="i" />
      </div>
      <div
        v-else
        class="flex flex-col items-center text-center mx-auto my-10 gap-4 text-gray-500"
      >
        <div class="flex items-center space-x-2">
          <Icon name="carbon:bot" size="3em" />
          <Icon name="ph:heart-thin" size="2em" />
          <Icon name="simple-icons:buymeacoffee" size="3em" />
        </div>

        <p class="text-3xl">Not found match</p>
      </div>
    </div>

    <!-- <Newsletter /> -->
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
  </Container>
</template>
