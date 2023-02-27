<template>
  <div class="flex py-3 items-center mt-5">
    <div class="text-2xl">
      <slot name="title" />
    </div>
    <div class="flex-auto" />
    <slot name="more" />
  </div>
  <slot />
</template>
