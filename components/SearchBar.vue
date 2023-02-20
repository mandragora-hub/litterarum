<template>
  <form class="md:inline-block hidden">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center px-3 cursor-pointer"
      >
        <Icon name="ic:outline-search" />
      </div>
      <input
        type="search"
        class="w-full pl-10 pr-30 py-2 text-sm text-gray-900 caret-blue-500 accent-transparent border border-gray-300 rounded-md bg-gray-100"
        :placeholder="$t('components.search_bar.placeholder')"
        required
      />
    </div>
  </form>
</template>
