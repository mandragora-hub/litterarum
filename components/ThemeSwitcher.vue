<template>
  <div class="flex items-center">
    <button
      type="button"
      :title="$t('components.theme_switcher.change_theme')"
      class="transition-colors duration-300"
      @click="toggleDark()"
    >
      <span v-if="isDark" class="flex justify-center items-center">
        <UIcon name="i-ph-moon" />
      </span>
      <span v-if="!isDark" class="flex justify-center items-center">
        <UIcon name="i-ph-sun" />
      </span>
    </button>
  </div>
</template>
