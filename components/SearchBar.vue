<script setup lang="ts">
import { nextTick } from "vue";
type SearchBarSize = "lg" | "md" | "xs";
const props = withDefaults(defineProps<{ size: SearchBarSize }>(), {
  size: "xs",
});

const input = ref();

const result = ref();
const searchMatch = useDebounceFn(
  async (event: Event) => {
    const el = event.target as HTMLInputElement;
    const text = el.value;
    const { data } = await searchBooks(text);
    result.value = data.value;
  },
  1000,
  { maxWait: 5000 }
);

defineShortcuts({
  meta_k: () => {
    nextTick(() => input?.value?.$refs?.input?.focus());
  },
});
</script>
<template>
  <form class="md:inline-block hidden" action="/search" method="get">
    <div class="relative">
      <UInput
        ref="input"
        list="book-search"
        type="search"
        color="gray"
        :size="props.size"
        name="q"
        icon="i-heroicons-magnifying-glass-20-solid"
        :trailing="false"
        :placeholder="$t('components.search_bar.placeholder')"
        @input="searchMatch"
      />
      <!-- :class="[searchBarSizeStyles[props.size], $attrs.class]" -->
      <!-- class="placeholder:truncate w-full pl-10 py-2 text-sm text-gray-900 caret-blue-500 accent-transparent border border-gray-300 rounded-md bg-gray-100" -->
      <datalist id="book-search">
        <option
          v-for="(item, index) of result?.data"
          :key="index"
          :value="item.title"
        ></option>
      </datalist>
    </div>
  </form>
</template>
