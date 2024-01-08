<script setup lang="ts">
import type { Book } from "~/types";
import { QUERY_LIST } from "~/constants/lists";

const { t } = useI18n();

const app = useAppConfig();
const route = useRoute();
const q = computed(() => route.query.q as string);

const el = ref<HTMLElement | null>(null);
useInfiniteScroll(el, () => loadMore());

const books = ref<Book[] | undefined>();
const pages = ref(1);
const { data: initialData } = await searchBooks(q.value, pages.value, 10);
books.value = initialData.value?.data;

const loadMore = async () => {
  if (initialData.value!.meta.totalPages <= pages.value) return;

  pages.value++;
  const { data: result } = await searchBooks(q.value, pages.value, 10);
  books.value?.push(...result.value!.data);
};

watch(
  () => q.value,
  async () => {
    pages.value = 1; // reset paging counter
    books.value = undefined; 
    
    const { data: result } = await searchBooks(q.value, pages.value, 10);
    books.value = result.value?.data;
    initialData.value = result.value;
  }
);

const queries = $computed(() => [QUERY_LIST.book[0], QUERY_LIST.book[1]]);

useSeoMeta({
  title: `Resultado de ${q.value} - ${app.name}`,
  ogTitle: `Resultado de ${q.value} - ${app.name}`,
  description: app.description,
  ogDescription: app.description,
  ogImage:
    "https://www.nicepng.com/png/full/6-66634_open-book-logo-png-sketch.png",
  twitterDescription: app.description,
  twitterTitle: `Resultado de ${q.value} - ${app.name}`,
  twitterImage:
    "https://www.nicepng.com/png/full/6-66634_open-book-logo-png-sketch.png",
});

const breadcrumbsLinks = reactive([
  {
    label: t("components.breadcrumbs.home"),
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: q,
    icon: "i-heroicons-magnifying-glass",
  },
]);
</script>
<template>
  <Container>
    <UBreadcrumb :links="breadcrumbsLinks" class="mb-6" />
    <div class="flex flex-col space-y-8 border-b pb-12">
      <header class="">
        <h1 class="text-2xl">
          {{ capitalize($t("pages.search.results_for")) }}
          <span class="text-slate-500 lowercase underline">{{
            `${q} (${initialData?.meta.count})`
          }}</span>
        </h1>
      </header>
      <div
        v-if="initialData?.meta.count"
        ref="el"
        class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5"
      >
        <MediaBook v-for="i in books" :key="i._id" :item="i" />
      </div>
      <div v-else class="flex flex-col items-end mx-auto my-10 gap-2">
        <p class="text-3xl text-center text-balance">
          {{ t("pages.search.not_found_match") }}
        </p>
        <div class="flex items-center space-x-2 text-xl">
          <UIcon name="i-ph-alien" />
          <UIcon name="i-ph-heart" />
          <UIcon name="i-ph-coffee" />
        </div>
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
