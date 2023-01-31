<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "~/stores/counter";
// tracks mouse position
const { x, y } = useMouse();

// is user prefers dark theme
const isDark = usePreferredDark();

const main = useMainStore(); // extract specific store properties
const { counter, doubleCounter } = storeToRefs(main);
</script>
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>

    <div class="border m-10 p-2">
      <h2>Testing VueUse</h2>
      <p>
        isDark: <span>{{ isDark }}</span>
      </p>
      <p>
        Mouse x: <span>{{ x }}</span>
      </p>
      <p>
        Mouse y: <span>{{ y }}</span>
      </p>
    </div>
    <div class="border m-10 p-2">
      <h2>Testing pinia</h2>
      <p>
        Counter: <span>{{ counter }}</span>
      </p>
      <p>
        DoubleCounter: <span>{{ doubleCounter }}</span>
      </p>
      <button type="button" @click="main.pluOne">Plus one</button>
    </div>
  </div>
</template>
