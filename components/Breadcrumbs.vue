<script setup lang="ts">
export type BreadcrumbItem = {
  text: string;
  href: string;
};

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
<template>
  <div aria-label="breadcrumb" class="w-max" :class="$attrs.class">
    <ol class="flex w-full flex-wrap items-center rounded-md py-2">
      <li
        class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration- 300 hover:text-blue-500"
      >
        <NuxtLink class="opacity-60" to="/">
          <UIcon name="i-mdi-home" class="text-xl" />
        </NuxtLink>
        <span
          class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased"
        >
          /
        </span>
      </li>

      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-blue-500"
      >
        <NuxtLink
          class="opacity-100 font-medium text-blue-gray-900 transition-colors hover:text-blue-500"
          :class="{ 'opacity-60': index !== items.length - 1 }"
          :to="item.href"
        >
          <span class="capitalize">{{ item.text }}</span>
        </NuxtLink>
        <span
          v-if="index < items.length - 1"
          class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased"
        >
          /
        </span>
      </li>
      <!-- <li
        class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased transition-colors duration-300 hover:text-blue-500"
      >
        <a
          class="font-medium text-blue-gray-900 transition-colors hover:text-blue-500"
          href="#"
        >
          Breadcrumbs
        </a>
      </li> -->
    </ol>
  </div>
</template>
