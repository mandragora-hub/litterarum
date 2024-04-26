<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <div class="container max-w-screen-xl mx-auto px-4" :class="$attrs.class">
    <slot />
  </div>
</template>
