<script setup lang="ts">
import { parseMarkdown } from "~/utils/parseMarkdown";
import { QUERY_LIST } from "~/constants/lists";
import { TypeFile } from "~~/types";

const route = useRoute();
const bookId = route.params.id as string;

const book = await getBook(bookId);
const { t } = useI18n();
const queries = $computed(() => [QUERY_LIST.book[5]]);

const readerLink = $computed(() => `reader/${book.data.ePubFile}`);

const downloadLink = (type: TypeFile = "pdf") => {
  const bookId = book.data._id;
  return `/download/${bookId}/${type}`;

  // const result = await downloadBook(bookId, type);
  // const blobURL = URL.createObjectURL(result);

  // console.log(result)
  // window.open(blobURL);
};

const bookDescription = ref<null | string>();
bookDescription.value = await parseMarkdown(
  book.data.description ? book.data.description : ""
);

const bookRating = await getBookRatingByTitle(book.data.title);

const highlight = reactive([
  {
    name: "pages.book.pages",
    icon: "mdi:book-open-page-variant-outline",
    value: book.data.pages || 123,
  },
  {
    name: "pages.book.publication_date",
    icon: "mdi:calendar-multiselect-outline",
    value: "value",
  },
  {
    name: "pages.book.language",
    icon: "mdi:translate",
    value: "español",
  },
  {
    name: "pages.book.file",
    icon: "mdi:file",
    value: "PDF / Epub",
  },
  {
    name: "pages.book.isbn",
    icon: "mdi:id-card",
    value: "81273871-821",
  },
]);

const aboutThisBook = reactive([
  {
    name: "pages.book.date_added",
    icon: "mdi:calendar-blank",
    value: "10-23-32",
  },
  {
    name: "pages.book.total_views",
    icon: "mdi:eye",
    value: book.data.views,
  },
  {
    name: "pages.book.downloaded",
    icon: "mdi:download",
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

useHead(() => ({
  title: book.data.title,
  meta: [
    {
      name: "description",
      content: book.data.description || "",
    },
  ],
}));

const items = reactive([
  {
    text: t("components.breadcrumbs.books"),
    href: "/books",
  },
  {
    text: book.data.title || "",
    href: "#",
  },
]);
</script>
<template>
  <Container>
    <Breadcrumbs :items="items" class="-mt-4 mb-6" />
    <!-- book overview -->
    <div class="flex flex-col lg:flex-row border-b pb-8 space-y-4">
      <!-- image o book cover -->
      <div
        class="h-96 w-full mr-10 rounded-lg bg-gray-400 aspect-[10/16] transition duration-400 hover:scale-105 hover:z-10"
      >
        <NuxtImg
          v-if="book.data.coverUrl"
          width="400"
          height="600"
          format="webp"
          :src="book.data.coverUrl"
          :alt="book.data.title || book.data.author?.name"
          class="w-full h-full rounded-lg object-cover"
        />
        <div v-else class="h-full opacity-10 flex">
          <Icon name="mdi:rabbit" class="m-auto text-4xl" />
        </div>
      </div>
      <!-- information -->
      <div class="flex flex-col">
        <header class="border-b mb-4">
          <h1 class="text-3xl font-bold capitalize">
            {{ book.data.title }}
            <span v-if="book.data.subtitle" class="text-lg font-light">{{
              book.data.subtitle
            }}</span>
          </h1>
          <p class="uppercase font-light">
            {{
              book.data?.author?.name
                ? `${$t("pages.book.by")} ${book.data.author.name}`
                : $t("pages.book.unknown")
            }}
          </p>
          <StarsRate
            class="mb-4"
            :reviews="bookRating?.reviews?.length"
            :rating="bookRating?.rating"
          />
        </header>
        <ContentRendererMarkdown
          v-if="bookDescription"
          :value="bookDescription"
        />

        <!-- <p class="line-clamp-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe,
          temporibus, harum impedit fugit magni provident dignissimos rem
          perferendis porro facere eius, autem magnam tenetur sed consequatur!
          Omnis molestias ullam aliquid! temporibus, harum impedit fugit magni
          provident dignissimos rem perferendis porro facere eius, autem magnam
          tenetur sed consequatur! Omnis molestias ullam aliquid! Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Saepe,
        </p> -->
        <!-- tags and reading time  -->
        <div class="flex items-center justify-end my-2">
          <Icon name="ph:clock-light" class="mr-2" />
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
            <Icon :name="i.icon" />
            <span class="whitespace-nowrap capitalize">{{ i.value }}</span>
          </div>
        </div>
        <!-- download options buttons  -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Button
            v-if="book.data.pdfFile"
            icon="mdi:file-pdf"
            text="Download PDF"
            size="md"
            class="uppercase"
            :href="downloadLink('pdf')"
          />
          <!-- <Button text="Download Epub" type="secondary" size="md" class="uppercase" /> -->
          <Button
            v-if="book.data.ePubFile"
            icon="ic:outline-menu-book"
            text="Read online"
            type="secondary"
            size="md"
            class="uppercase"
            :href="readerLink"
          />
          <!-- <Button text="Send via e-mail" type="secondary" size="md" class="uppercase" /> -->
        </div>
      </div>
      <!-- About book, tags, and share options -->
      <div class="w-full flex flex-col lg:pl-24 space-y-8 divide-y">
        <div v-if="book.data.tags.length > 0" class="flex flex-col space-y-2">
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.tags") }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(item, key) in book.data.tags"
              :key="key"
              class="text-sm cursor-pointer border bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded capitalize text-black"
            >
              <span>{{ item.tag }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-2 pt-8 first:pt-0">
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.share") }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 rounded p-2 text-center dark:focus:ring-[#3b5998]/55"
            >
              <Icon name="mdi:facebook" size="1.5em" />
            </button>
            <button
              type="button"
              class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 rounded p-2 text-center dark:focus:ring-[#1da1f2]/55"
            >
              <Icon name="mdi:twitter" size="1.5em" />
            </button>
            <button
              type="button"
              class="text-white bg-[#128C7E] hover:bg-[#128C7E]/90 focus:ring-4 focus:outline-none focus:ring-[#128C7E]/50 rounded p-2 text-center dark:focus:ring-[#128C7E]/55"
            >
              <Icon name="mdi:whatsapp" size="1.5em" />
            </button>
            <button
              type="button"
              class="text-gray-400 border-black border border-dashed rounded p-2 text-center"
            >
              <Icon name="mdi:plus" size="1.5em" />
            </button>
          </div>
        </div>
        <div class="flex flex-col space-y-2 pt-8">
          <h3 class="font-bold text-xl capitalize">
            {{ $t("pages.book.about_this_book") }}
          </h3>
          <ol class="text-gray-600 flex flex-col space-y-2">
            <li
              v-for="item of aboutThisBook"
              :key="item.name"
              class="flex flex-row space-x-1 items-center"
            >
              <Icon :name="item.icon" size="1em" />
              <p class="text-md capitalize">
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
  </Container>
</template>
