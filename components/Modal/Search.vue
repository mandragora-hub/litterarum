<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import type { Book, PageResult } from "~/types";

const { searchModalOpen, setSearchModal } = useModal();
const router = useRouter();

const state = reactive({
  input: "",
});

const result = ref<PageResult<Book> | null>();
const searchMatch = useDebounceFn(
  async (event: Event) => {
    const el = event.target as HTMLInputElement;
    const text = el.value;
    const { data } = await searchBooks(text);
    result.value = data.value;
  },
  500,
  { maxWait: 1000 }
);

const highlight = (word: string) => {
  const query = state.input;
  if (!query) {
    return word;
  }
  return word.replace(new RegExp(query, "gi"), (match) => {
    return "<strong>" + match + "</strong>";
  });
};  

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.input) errors.push({ path: "input", message: "Required" });
  return errors;
};

function onSubmit(event: FormSubmitEvent<any>) {
  router.push(`/search?q=${event.data.input}`);
  close();
}

const close = () => {
  setSearchModal(false);
  state.input = ""; // clear input
  result.value = null;
};

</script>
<template>
  <UModal v-model="searchModalOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow !px-0 !py-0',
        },
      }"
    >
      <template #header>
        <UForm
          :validate="validate"
          :state="state"
          class="flex items-center space-x-2"
          @submit="onSubmit"
        >
          <UInput
            v-model="state.input"
            type="search"
            class="grow"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color="white"
            :placeholder="$t('components.search_bar.placeholder')"
            @input="searchMatch"
          />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="close"
          />
        </UForm>
      </template>

      <div class="h-full w-full">
        <ul>
          <li
            v-for="item in result?.data"
            :key="item._id"
            class="py-2 hover:bg-slate-100 cursor-pointer"
          >
            <NuxtLink
              class="flex items-center justify-between px-4"
              :to="`/books/${item.slug}`"
              @click="close"
            >
              <span v-html="highlight(item.title)" />
              <UIcon name="i-ph-arrow-elbow-left-light" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </UCard>
  </UModal>
</template>
