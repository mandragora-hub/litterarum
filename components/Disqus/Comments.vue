<script setup>
import { DisqusComments as VueDisqusComments } from "vue3-disqus";

const props = defineProps({
  ...VueDisqusComments.props,
  shortname: {
    type: String,
    default: () => useNuxtApp()?.$disqusOptions?.shortname,
  },
});

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

useDark({
  onChanged: () => {
    forceRerender();
  },
});

</script>

<template>
  <div :class="props.class">
    <VueDisqusComments :key="componentKey" v-bind="props" />
  </div>
</template>
