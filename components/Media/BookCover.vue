<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
const props = defineProps<{ src: string | undefined }>();

const hoverAnimation = ref(
  "transition duration-400 hover:scale-105 hover:z-10"
);
const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndLarger = breakpoints.greaterOrEqual("lg"); // sm and larger
const cleanUrl = (url: string) => {
  // doing this we avoid the mixed content error in modern browsers
  const urlObj = new URL(url);

  if (urlObj.protocol === "http:") {
    urlObj.protocol = "https:";
  }

  return urlObj.toString();
};
</script>
<template>
  <div
    class="rounded-lg bg-gray-400 aspect-[10/16]"
    :class="[lgAndLarger ? hoverAnimation : '', $attrs.class]"
  >
    <NuxtImg
      v-if="props.src"
      width="400"
      height="600"
      format="webp"
      placeholder
      :src="cleanUrl(props.src)"
      class="w-full h-full rounded-lg object-cover"
    />
    <div v-else class="animate-pulse h-full opacity-10 flex">
      <UIcon name="i-mdi-rabbit" class="m-auto text-4xl" />
    </div>
  </div>
</template>
