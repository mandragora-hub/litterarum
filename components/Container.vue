<script lang="ts" setup>
const props = defineProps<{ class?: string }>();
</script>

<template>
  <div class="container max-w-screen-xl mx-auto px-4" :class="props.class">
    <slot />
  </div>
</template>
