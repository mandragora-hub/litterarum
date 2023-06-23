<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number;
    value?: number;
    readonly?: boolean;
    hasCounter?: boolean;
  }>(),
  {
    count: 5,
    value: 1,
    readonly: true,
    hasCounter: false,
  }
);
const stars = computed(() => {
  const arr = new Array(props.count).fill(0);
  return arr.map((_value, index) => index);
});

const rate = (newRate: number) => {
  console.log(newRate);
};
</script>

<template>
  <div class="flex items-center flex-wrap gap-x-2" :class="$attrs.class">
    <ul class="flex items-center justify-center space-x-1">
      <li
        v-for="(item, index) in stars"
        :key="index"
        class="transition duration-400 hover:scale-125"
        @click="rate(item)"
      >
        <UIcon v-if="item <= props.value" size="15px" name="i-ph:star-fill" />
        <UIcon v-else size="15px" name="i-ph:star" />
      </li>
    </ul>
    <span v-if="hasCounter" class="mt-1"
      >{{ props.value }} of {{ stars.length }}</span
    >
  </div>
</template>
