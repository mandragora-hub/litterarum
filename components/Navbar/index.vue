<template>
  <NavbarBase>
    <template #menu>
      <div class="relative hidden lg:flex items-center ml-auto">
        <div class="flex items-center justify-center">
          <SearchBar />
        </div>
        <div
          class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
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
