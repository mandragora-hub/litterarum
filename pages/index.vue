<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "~/stores/counter";

// tracks mouse position
const { x, y } = useMouse();

const mainStore = useMainStore(); // extract specific store properties
const { counter, doubleCounter } = storeToRefs(mainStore);

const { locale, availableLocales } = useLocale();

let headlessuiToggleTest = $ref(false);
const setHeadlessuiToggleTest = (e: boolean) => (headlessuiToggleTest = e);
</script>
<template>
  <Container>
    <h1 class="text-4xl font-bold">
      Welcome to the <span class="text-blue-400">demo page</span>
    </h1>
    <AppAlert>This is an auto-imported component</AppAlert>

    <div class="flex flex-wrap gap-x-5 my-4">
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing VueUse</h2>
        <p>
          Mouse x: <span>{{ x }}</span>
        </p>
        <p>
          Mouse y: <span>{{ y }}</span>
        </p>
        <p>
          isDark: <span>{{ isDark }}</span>
        </p>
        <button
          class="bg-slate-700 hover:bg-slate-500 text-white capitalize text-xs font-bold py-2 px-4 rounded"
          type="button"
          @click="toggleDark()"
        >
          Toggle dark
        </button>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing pinia</h2>
        <p>
          Counter: <span>{{ counter }}</span>
        </p>
        <p>
          DoubleCounter: <span>{{ doubleCounter }}</span>
        </p>
        <div class="flex gap-x-2">
          <button
            class="bg-slate-700 hover:bg-slate-500 text-white capitalize text-xs font-bold py-2 px-4 rounded"
            type="button"
            @click="mainStore.pluOne"
          >
            Plus one
          </button>
          <button
            class="bg-slate-700 hover:bg-slate-500 text-white capitalize text-xs font-bold py-2 px-4 rounded"
            type="button"
            @click="mainStore.reset"
          >
            reset
          </button>
        </div>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing localization (i18n)</h2>
        <p>{{ $t("pages.demo.message") }}</p>
        <form>
          <label for="locale-select">{{ $t("language") }}: </label>
          <select id="locale-select" v-model="locale">
            <option v-for="i of availableLocales" :key="i" :value="i">
              {{ i }}
            </option>
          </select>
        </form>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing icon (nuxt-icon)</h2>
        <div class="flex gap-2 mt-2">
          <Icon name="uil:github" size="24px" />
          <Icon name="🚀" size="24px" />
          <Icon name="nuxt" size="24px" />
          <Icon name="twemoji:pineapple" size="24px"></Icon>
        </div>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing nuxt-content</h2>
        <NuxtLink to="/about">Go to about page</NuxtLink>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing headlessui</h2>
        <div class="flex items-end gap-x-2">
          <Toggle @change="setHeadlessuiToggleTest" />
          <span
            class="text-lg font-bold"
            :class="{
              'text-red-400': !headlessuiToggleTest,
              'text-green-400': headlessuiToggleTest,
            }"
            >{{ headlessuiToggleTest ? "On" : "Off" }}</span
          >
        </div>
      </div>
      <div class="border p-4 my-2">
        <h2 class="text-lg font-bold">Testing nuxt image (@nuxt/image-edge)</h2>
        <nuxt-img
          class="mx-auto"
          src="nuxt-logo.svg"
          width="100"
          height="100"
        />
      </div>
    </div>
  </Container>
</template>
