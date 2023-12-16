<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

// type Locales = "en" | "es";
// const locales = {
//   en: {
//     name: "English",
//     iso: "en",
//     flag: "🇺🇸",
//   },
//   es: {
//     name: "Español",
//     iso: "es",
//     flag: "🇪🇸️",
//   },
// };

const { t, locale, availableLocales, setLocale } = useI18n();

const props = defineProps({
  type: {
    type: String,
    default: "dropdown-right-top",
  },
});

const currentStyle = toRef(props, "type");
</script>

<template>
  <div class="flex items-center">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      as="div"
      class="relative flex items-center"
      :value="locale"
      @update:model-value="(newValue) => setLocale(newValue)"
    >
      <ListboxLabel class="sr-only">Theme</ListboxLabel>
      <ListboxButton
        type="button"
        :title="t('components.language_switcher.change_language')"
        class="transition-colors duration-300"
      >
        <span class="justify-center items-center flex">
          <UIcon name="i-ph-translate" />
        </span>
      </ListboxButton>
      <ListboxOptions
        class="p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <ListboxOption
          v-for="i in availableLocales"
          :key="i"
          :value="i"
          :class="{
            'py-2 px-2 flex items-center cursor-pointer': true,
            'text-sky-500 bg-gray-100 dark:bg-gray-600/30': locale === i,
            'hover:bg-gray-50 dark:hover:bg-gray-700/30': locale !== i,
          }"
        >
          <span class="text-sm capitalize">
            {{ i }}
            <!-- </span> -->
            <!-- <span class="flex-1 truncate">
            {{ i }}
            <span class="text-xs">({{ locales.iso }})</span>
          -->
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="locale"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option
        v-for="i in availableLocales"
        :key="i"
        :value="i"
        class="flex items-center space-x-2"
      >
        {{ i }}
      </option>
    </select>
  </div>
</template>
