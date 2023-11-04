<script setup lang="ts">
const { main } = useGlobalHtmlElement();
</script>
<template>
  <div>
    <MediaHeroBackground />
    <div ref="main" class="flex flex-col min-h-screen">
      <slot name="header">
        <Navbar />
      </slot>
      <main class="flex-1 mx-auto w-full h-full my-4">
        <slot />
      </main>
      <slot name="footer">
        <Footer />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
