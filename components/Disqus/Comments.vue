<script setup>
import { DisqusComments as VueDisqusComments } from "vue3-disqus";

const props = defineProps({
  ...VueDisqusComments.props,
  shortname: {
    type: String,
    default: () => useNuxtApp()?.$disqusOptions?.shortname,
  },
});
</script>

<template>
  <VueDisqusComments v-bind="props" />
</template>
