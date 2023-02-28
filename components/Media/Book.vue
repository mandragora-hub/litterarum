<script setup lang="ts">
import type { Book, MediaType } from "~/types";

defineProps<{
  type: MediaType;
  item: Book;
}>();
</script>

<template>
  <NuxtLink :to="`/${type}/${item._id}`" class="w-full h-full p-2">
    <div
      class="block rounded-lg bg-gray-400 aspect-[10/16] transition duration-400 hover:scale-105 hover:z-10"
    >
      <NuxtImg
        v-if="item.coverUrl"
        width="400"
        height="600"
        format="webp"
        :src="item.coverUrl"
        :alt="item.title || item.author.name"
        class="w-full h-full rounded-lg object-cover bg-[url('https://singlecolorimage.com/get/888a85/100x100')]"
      />
      <div v-else class="animate-pulse h-full opacity-10 flex">
        <Icon name="mdi-rabbit" class="m-auto text-4xl" />
      </div>
    </div>
    <div class="text-left mt-2">
      <h5>{{ item.title }}</h5>
      <p class="text-gray-600">
        {{ item.author ? item.author.name : "Anónimo" }}
      </p>
    </div>
    <div class="flex text-sm gap-2 items-center">
      <StarsRate class="w-20" :value="item.downloaded" />
      <div class="opacity-60">
        {{ item.downloaded }}
      </div>
    </div>
  </NuxtLink>
</template>
