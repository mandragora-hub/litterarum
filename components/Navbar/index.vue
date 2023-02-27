<template>
  <NavbarBase>
    <template #menu>
      <div
        class="divide-x space-x-4 relative hidden lg:flex items-center ml-auto"
      >
        <Transition>
          <div
            v-if="isSearchBarOnNavbar"
            class="flex items-center justify-center"
          >
            <SearchBar size="xs" />
          </div>
        </Transition>
        <div
          class="flex space-x-4 pl-4 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Anchor
            class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
            href="https://github.com/mandragora-hub/litterarum"
            title="Github"
          >
            <Icon name="mdi:github-face" />
          </Anchor>
        </div>
      </div>
    </template>
    <template #options="{ toggleOptions }">
      <ActionSheet @on-close="toggleOptions(false)">
        <ActionSheetBody>
          <ActionSheetHeader text="Menu" />
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t("components.theme_switcher.change_theme") }}
          </div>
          <div class="mt-2">
            <ThemeSwitcher type="select-box" />
          </div>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t("components.language_switcher.change_language") }}
          </div>
          <div class="mt-2">
            <LanguageSwitcher type="select-box" />
          </div>
        </ActionSheetBody>
        <Button
          type="secondary"
          title="Github"
          href="https://github.com/mandragora-hub/litterarum"
        >
          <Icon name="mdi-github-face" />

          <span class="ml-1">Github</span>
        </Button>
        <Button
          text="Close"
          type="secondary"
          @click.prevent="toggleOptions(false)"
        />
      </ActionSheet>
    </template>
    <template #drawer>
      <NavbarDrawer />
    </template>
  </NavbarBase>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
