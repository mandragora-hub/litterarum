<template>
  <div class="flex items-center">
    <button
      type="button"
      :title="$t('components.theme_switcher.change_theme')"
      class="transition-colors duration-300"
      @click="toggleDark()"
    >
      <span v-if="isDark" class="flex justify-center items-center">
        <Icon name="uil:moon" />
      </span>
      <span v-if="!isDark" class="flex justify-center items-center">
        <Icon name="uil:sun" />
      </span>
    </button>
  </div>
</template>
