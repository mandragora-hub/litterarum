<script setup lang="ts">
const route = useRoute()
const bookId = route.params.id as string

console.log(bookId);
</script>
<template>
  <Container>
    <h1 class="text-4xl font-bold">
      Welcome to the <span class="text-blue-400">book page</span>
    </h1>
    <AppAlert>This is an auto-imported component</AppAlert>
  </Container>
</template>
