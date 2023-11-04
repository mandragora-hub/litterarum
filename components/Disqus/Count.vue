<script setup>
import { DisqusCount as VueDisqusCount } from "vue3-disqus";

const props = defineProps({
  ...VueDisqusCount.props,
  shortname: {
    type: String,
    default: () => useNuxtApp()?.$disqusOptions?.shortname,
  },
});
</script>

<template>
  <VueDisqusCount v-bind="props" />
</template>
