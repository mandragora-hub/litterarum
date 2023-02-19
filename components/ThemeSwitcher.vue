<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: "dropdown-right-top",
  },
});

// state
type IThemeSettingOptions = "dark" | "light" | "system" | "realtime";
const themeSetting = useState<IThemeSettingOptions>("theme.setting");
const currentStyle = toRef(props, "type");

const availableThemes: {
  key: IThemeSettingOptions;
  text: string;
}[] = [
  { key: "light", text: "Light" },
  { key: "dark", text: "Dark" },
  { key: "system", text: "System" },
  { key: "realtime", text: "Realtime" },
];
</script>

<template>
  <div class="flex items-center">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="themeSetting"
      as="div"
      class="relative flex items-center"
    >
      <ListboxLabel class="sr-only">
        {{ $t("components.theme_switcher.theme") }}
      </ListboxLabel>
      <ListboxButton
        type="button"
        :title="$t('components.theme_switcher.change_theme')"
        class="transition-colors duration-300"
      >
        <span class="flex justify-center items-center dark:hidden">
          <Icon name="uil:sun" />
        </span>
        <span class="justify-center items-center hidden dark:flex">
          <Icon name="uil:moon" />
        </span>
      </ListboxButton>
      <ListboxOptions
        class="p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <ListboxOption
          v-for="theme in availableThemes"
          :key="theme.key"
          :value="theme.key"
          :class="{
            'py-2 px-2 flex items-center cursor-pointer': true,
            'text-sky-500 bg-gray-100 dark:bg-gray-600/30':
              themeSetting === theme.key,
            'hover:bg-gray-50 dark:hover:bg-gray-700/30':
              themeSetting !== theme.key,
          }"
        >
          <span class="text-sm mr-2 flex items-center">
            <Icon v-if="theme.key === 'light'" name="uil:sun" />
            <Icon v-else-if="theme.key === 'dark'" name="uil:moon" />
            <Icon v-else-if="theme.key === 'system'" name="uil:laptop" />
            <Icon v-else-if="theme.key === 'realtime'" name="uil:clock" />
          </span>
          {{ theme.text }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="themeSetting"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option
        v-for="theme in availableThemes"
        :key="theme.key"
        :value="theme.key"
      >
        {{ theme.text }}
      </option>
    </select>
  </div>
</template>
