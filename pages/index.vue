<script setup lang="ts">
import { QUERY_LIST } from "~/constants/lists";

// const AsyncWrapper = defineComponent(async (_, ctx) => {
//   const list = await listMedia("books", queries[0].query, 1);
//   const { data: item } = await getBook(list.data[0]._id);
//   return () => ctx.slots?.default?.({ item });
// });

const queries = $computed(() => [QUERY_LIST.book[0], QUERY_LIST.book[1], QUERY_LIST.book[2]]);

const app = useAppConfig();

useSeoMeta({
  title: `${app.name} - ${app.tagline}`,
  ogTitle: `${app.name} - ${app.tagline}`,
  description: app.description,
  ogDescription: app.description,
  twitterDescription: app.description,
  twitterTitle: `${app.name} - ${app.tagline}`,
});

defineOgImageScreenshot();
</script>
<template>
  <Container>
    <!-- <AsyncWrapper>
      <template #default="{ item }">
        <MediaHero :item="item" />
      </template>
    </AsyncWrapper> -->
    <div class="flex flex-col">
      <GridAutoQuery :query="QUERY_LIST.book[0]" />
      <CarouselAutoQuery
        v-for="query of queries"
        :key="query.type + query.query"
        :query="query"
      />
    </div>
  </Container>
</template>
