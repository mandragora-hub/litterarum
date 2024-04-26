<script setup lang="ts">
import type { BreadcrumbLink } from "@nuxt/ui/dist/runtime/types";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const q = computed(() => route.query.q);

const defaultBreadcrumb = (value: string): BreadcrumbLink => {
  const v = capitalizeFirstLetter(value.replaceAll("-", " "));
  return {
    label: v,
    icon: "i-heroicons-link",
  };
};

const breadcrumbs: Record<string, BreadcrumbLink> = {
  home: {
    label: t("components.breadcrumbs.home"),
    icon: "i-heroicons-home",
    to: "/",
  },
  books: {
    label: t("components.breadcrumbs.books"),
    icon: "i-heroicons-square-3-stack-3d",
    to: "/books",
  },
  search: {
    label: capitalizeFirstLetter(q.value?.toString() || ""),
    icon: "i-heroicons-magnifying-glass",
  },
};

const breadcrumbsBase = new Proxy(breadcrumbs, {
  get: function (obj, prop: string) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return obj[prop];
    return defaultBreadcrumb(prop);
  },
});

const breadcrumbsLinks = computed(() => {
  if (router.currentRoute.value.path === "/") return;
  return router.currentRoute.value.path
    .split("/")
    .filter((v, index) => {
      return index === 0 ? true : !/^\s*$/.test(v);
    })
    .map((value: string, index: number) => {
      if (index === 0) return breadcrumbsBase.home;
      return breadcrumbsBase[value];
    });
});
</script>

<template>
  <UBreadcrumb
    :links="breadcrumbsLinks"
    :class="$attrs.class"
    :ui="{ base: 'first-letter:uppercase' }"
  />
</template>
