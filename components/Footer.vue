<script lang="ts" setup>
import p from "../package.json";
const app = useAppConfig();
const { t } = useI18n();
</script>

<template>
  <footer class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]">
    <Container class="py-4 text-left">
      <NuxtLink to="/demo">
        <div class="flex items-center gap-x-2 mb-1">
          {{ app.name }}
          <UIcon name="i-ph-egg-crack-duotone" class="text-xl" />
        </div>
      </NuxtLink>
      <div class="text-xs text-gray-600 dark:text-gray-400">
        {{ t("footer.made_for") }} Creative Commons,
        <NuxtLink
          class="hover:underline hover:text-blue inline-flex items-center gap-x-px"
          target="_blank"
          href="https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1"
          >CC0 1.0 Universal
          <NuxtImg
            class="inline"
            width="18px"
            height="18px"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
          <NuxtImg
            class="inline"
            width="18px"
            height="18px"
            src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1"
        /></NuxtLink>
        <div class="flex flex-row space-x-2 items-center float-right">
          <span>
            {{ t("footer.design_by") }}
            <a href="https://github.com/mandragora-hub">mandragora-hub</a>
          </span>
          <span
            class="block bg-blue-500 rounded px-1 py-0.5 text-white text-xs"
          >
            {{ p.devDependencies.nuxt }}
          </span>
        </div>
      </div>
    </Container>
  </footer>
</template>
