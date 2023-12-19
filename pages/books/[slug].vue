<script setup lang="ts">
import { isClient } from "@vueuse/shared";
import { parseMarkdown } from "~/utils/parseMarkdown";
import { QUERY_LIST } from "~/constants/lists";

const app = useAppConfig();

const route = useRoute();
const slug = route.params.slug as string;

const book = await getBookBySlug(slug);
await incrementBookView(book.data._id);
const { t } = useI18n();
const queries = $computed(() => [QUERY_LIST.book[5]]);

const readerLink = $computed(() => `reader/${book.data.ePubFile}`);

const bookDescription = ref<null | Record<string, any>>();
bookDescription.value = await parseMarkdown(
  book.data.description ? book.data.description : ""
);

const formatDate = (date: Date) => {
  const parse = new Date(date);
  const intl = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  }).format(parse);
  return intl.toString();
};

const highlight = reactive([
  ...(book.data.pages
    ? [
        {
          name: "pages.book.pages",
          icon: "i-mdi-book-open-page-variant-outline",
          value: book.data.pages,
        },
      ]
    : []),
  ...(book.data.publicationDate
    ? [
        {
          name: "pages.book.publication_date",
          icon: "i-mdi-calendar-multiselect-outline",
          value: book.data.publicationDate,
        },
      ]
    : []),
  {
    name: "pages.book.language",
    icon: "i-mdi-translate",
    value: "español",
  },
  {
    name: "pages.book.file",
    icon: "i-mdi-file",
    value: "PDF / Epub",
  },
  ...(book.data.isbn
    ? [
        {
          name: "pages.book.isbn",
          icon: "i-mdi-id-card",
          value: book.data.isbn,
        },
      ]
    : []),
]);

const aboutThisBook = reactive([
  ...(book.data.createdAt
    ? [
        {
          name: "pages.book.date_added",
          icon: "i-mdi-calendar-blank",
          value: formatDate(book.data.createdAt),
        },
      ]
    : []),
  {
    name: "pages.book.total_views",
    icon: "i-mdi-eye",
    value: book.data.views,
  },
  {
    name: "pages.book.downloaded",
    icon: "i-mdi-download",
    value: book.data.downloaded,
  },
]);

const calculateReadTime = computed(() => {
  const time = book.data.readTime || 0;
  const words = book.data.wordCount?.toLocaleString("en-US") || 0;
  const { hours, minutes } = msToTime(time);
  return `${hours} ${t("others.hours")} ${minutes} ${t(
    "others.minutes"
  )} (${words} ${t("others.words")})`;
});

useSeoMeta({
  title: `${book.data.title} - ${app.name}`,
  ogTitle: `${book.data.title} - ${app.name}`,
  description: book.data.description,
  ogDescription: book.data.description,
  ogImage: book.data.coverUrl,
  twitterDescription: book.data.description,
  twitterTitle: `${book.data.title} - ${app.name}`,
  twitterImage: book.data.coverUrl,
});

const breadcrumbsLinks = reactive([{
  label: t("components.breadcrumbs.home"),
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: t("components.breadcrumbs.books"),
  icon: 'i-heroicons-square-3-stack-3d',
  to: "/books"
}, {
  label: book.data.title,
  icon: 'i-heroicons-link'
}])

const shareOptions = ref({
  title: `${book.data.title} - ${app.name}`,
  text: `${book.data.title} - ${app.name}`,
  url: isClient ? location.href : "",
});
const { share, isSupported: isSupportedWebShareAPI } = useShare(shareOptions);
const shareBook = () => {
  share().catch((err) => err);
};
</script>
<template>
  <Container>
    <UBreadcrumb :links="breadcrumbsLinks" class="mb-6" />
    <!-- book overview -->
    <div class="flex flex-col lg:flex-row border-b pb-8 space-y-4 lg:space-x-8">
      <!-- image, book cover and download buttons  -->
      <div class="flex flex-col space-y-4">
        <MediaBookCover class="h-96" :src="book.data.coverUrl" />
        <!-- download options buttons  -->
        <UButton
          v-if="book.data.pdfFile"
          icon="i-mdi-file-pdf"
          :label="$t('pages.book.options.download_pdf')"
          block
          size="xl"
          target="_blank"
          :to="book.data.pdfFile"
          @click="incrementBookDownload(book.data._id)"
        />
        <!-- <Button text="Download Epub" type="secondary" size="xl" class="uppercase" /> -->
        <UButton
          v-if="book.data.ePubFile"
          icon="i-ph-book-open-text"
          :label="$t('pages.book.options.read_online')"
          color="gray"
          variant="solid"
          block
          size="xl"
          target="_blank"
          :to="readerLink"
        />
        <UButton
          v-if="isSupportedWebShareAPI"
          icon="i-ph-share-network-fill"
          :label="$t('pages.book.options.share')"
          color="gray"
          variant="solid"
          block
          size="xl"
          @click="shareBook"
        />
        <!-- <Button text="Send via e-mail" type="secondary" size="md" class="uppercase" /> -->
      </div>
      <!-- information -->
      <div class="flex flex-col grow">
        <header class="border-b mb-4">
          <h1 class="text-3xl font-bold first-letter:capitalize">
            {{ book.data.title }}
            <span v-if="book.data.subtitle" class="text-lg font-light">{{
              book.data.subtitle
            }}</span>
          </h1>
          <p class="uppercase font-light">
            <span v-if="book.data?.author?.name"
              >{{ $t("pages.book.by") }}
              <NuxtLink
                class="underline cursor-pointer hover:opacity-80"
                :href="`/authors/${book.data.author._id}`"
                >{{ book.data.author.name }}</NuxtLink
              ></span
            >
            <span v-else>{{ $t("pages.book.unknown") }}</span>
          </p>
          <StarsRate class="mb-px" :book="book.data" />
        </header>
        <ContentRendererMarkdown
          v-if="bookDescription"
          class="line-clamp-8"
          :value="bookDescription"
        />
        <!-- tags and reading time  -->
        <div class="flex items-center justify-end my-2">
          <UIcon name="i-ph-clock-light" class="mr-2" />
          <p class="text-gray-600">{{ calculateReadTime }}</p>
        </div>
        <!-- highlight section -->
        <div class="flex flex-row flex-nowrap justify-between overflow-x-auto">
          <div
            v-for="i of highlight"
            :key="i.name"
            class="grid place-items-center text-sm p-4 gap-2"
          >
            <div class="font-light text-center capitalize text-slate-500">
              {{ $t(i.name) }}
            </div>
            <UIcon :name="i.icon" class="text-lg" />
            <span class="whitespace-nowrap capitalize">{{ i.value }}</span>
          </div>
        </div>
      </div>
      <!-- About book, tags, and share options -->
      <div class="flex flex-col grow space-y-8 divide-y">
        <div v-if="book.data.tags.length > 0" class="flex flex-col space-y-2">
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.tags") }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(item, key) in book.data.tags"
              :key="key"
              class="text-sm cursor-pointer border bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded capitalize text-black dark:text-white dark:bg-slate-800 dark:border-slate-700"
            >
              <span>{{ item.tag }}</span>
            </div>
          </div>
        </div>
        <div
          v-if="!isSupportedWebShareAPI"
          class="flex flex-col space-y-2 pt-8 first:pt-0"
        >
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.share") }}
          </h3>
          <SocialMediaButtons />
        </div>
        <div class="flex flex-col space-y-2 pt-8">
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.about_this_book") }}
          </h3>
          <ol class="text-gray-600 dark:text-gray-400 flex flex-col space-y-2">
            <li
              v-for="item of aboutThisBook"
              :key="item.name"
              class="flex flex-row space-x-1 items-center"
            >
              <UIcon :name="item.icon" class="text-xl" />
              <p class="text-md whitespace-nowrap capitalize">
                {{ $t(item.name) }}: {{ item.value }}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <!-- <Newsletter /> -->
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
    <!-- Comments -->
    <div class="mt-8">
      <DisqusComments :identifier="`/book/${book.data._id}`" />
    </div>
  </Container>
</template>
