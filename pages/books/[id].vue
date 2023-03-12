<script setup lang="ts">
import { QUERY_LIST } from "~/constants/lists";

const route = useRoute();
const bookId = route.params.id as string;

const book = await getBook(bookId);
// import { capitalize } from '~/utils/str'
const { t } = useI18n();
const queries = $computed(() => [QUERY_LIST.book[0]]);

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
    value: "653",
  },
  {
    name: "pages.book.downloaded",
    icon: "mdi:download",
    value: "12",
  },
]);

const calculateReadTime = computed(() => {
  const time = book.data.readTime || 0;
  const words = book.data.wordCount || 0;
  const { hours, minutes } = msToTime(time);
  return `${hours} ${t("others.hours")} ${minutes} ${t(
    "others.minutes"
  )} (${words} ${t("others.words")})`;
});

// useHead(() => ({
//   title: capitalize(t('pages.post.title')),
//   meta: [
//     {
//       name: 'description',
//       content: t('pages.post.description'),
//     },
//   ],
// }))

const items = reactive([
  {
    text: "books",
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

    <div class="flex flex-col lg:flex-row">
      <div
        class="h-96 w-full mr-10 rounded-lg bg-gray-400 aspect-[10/16] transition duration-400 hover:scale-105 hover:z-10"
      >
        <NuxtImg
          v-if="book.data.coverUrl"
          width="400"
          height="600"
          format="webp"
          :src="book.data.coverUrl"
          :alt="book.data.title || book.data.author.name"
          class="w-full h-full rounded-lg object-cover"
        />
        <div v-else class="h-full opacity-10 flex">
          <Icon name="mdi:rabbit" class="m-auto text-4xl" />
        </div>
      </div>
      <div class="flex flex-col">
        <header class="">
          <h1 class="text-3xl font-bold capitalize">
            {{ book.data.title }}
            <span v-if="book.data.subtitle" class="text-lg font-light">{{
              book.data.subtitle
            }}</span>
          </h1>
          <p class="uppercase">por {{ book.data.author.name }}</p>
          <StarsRate class="mb-4" :reviews="75" :rating="87" />
        </header>
        <p class="line-clamp-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe,
          temporibus, harum impedit fugit magni provident dignissimos rem
          perferendis porro facere eius, autem magnam tenetur sed consequatur!
          Omnis molestias ullam aliquid! temporibus, harum impedit fugit magni
          provident dignissimos rem perferendis porro facere eius, autem magnam
          tenetur sed consequatur! Omnis molestias ullam aliquid! Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Saepe,
        </p>
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

        <div class="grid grid-rows-2 lg:grid-cols-2 my-4 lg:divide-x">
          <div class="lg:px-10 first:pl-0">
            <Button text="Download PDF" size="md" class="uppercase" />
          </div>
          <div class="lg:px-10 last:pr-0 flex flex-col space-y-2">
            <h3 class="font-bold capitalize">
              {{ $t("pages.book.about_this_book") }}
            </h3>
            <ol class="ml-4 text-gray-600 flex flex-col space-y-2">
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
    </div>
    <!-- <Newsletter /> -->
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
  </Container>
</template>
