<script setup lang="ts">
const route = useRoute();
const isNotHomePage = computed(() => route.path !== "/");
</script>

<template>
  <div>
    <MediaHeroBackground />
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <Navbar />
      </slot>
      <main class="flex-1 mx-auto w-full h-full my-4">
        <Container>
          <Breadcrumb v-if="isNotHomePage" class="mb-6" />
          <slot />
        </Container>
      </main>
      <slot name="footer">
        <Footer />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
