<script lang="ts" setup>
const navbar = ref(null);
const showDrawer = useState<boolean>("navbar.showDrawer", () => false);
const showOptions = useState<boolean>("navbar.showOptions", () => false);

// lifecycle
let timer: number;
onMounted(() => {
  if (!navbar.value) return;

  // scroll
  const { onScroll } = useSticky(navbar.value, 0);
  setTimeout(() => onScroll(), 50);

  // on show on mobile
  setInterval(() => {
    // must in mobile
    const minW = 1024;
    if (window.innerWidth < minW) {
      updateDrawerOptions();
    }
  }, 100);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

// methods
const updateDrawerOptions = () => {
  // drawer
  if (showDrawer.value || showOptions.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};
const toggleDrawer = () => (showDrawer.value = !showDrawer.value);
const toggleOptions = (show?: boolean) => {
  if (show) {
    showOptions.value = show;
  } else {
    showOptions.value = !showOptions.value;
  }
};
const modal = useModal();
const openSearchModal = () => {
  modal.setSearchModal(true);
}
</script>

<template>
  <div
    ref="navbar"
    class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-slate-900/[0.5]"
  >
    <div id="navbar-banner" class="banner">
      <slot name="banner" />
    </div>
    <Container class="py-3">
      <div class="flex items-center">
        <!-- drawer:toggle -->
        <div
          v-if="$slots['drawer']"
          class="lg:hidden flex items-center self-center justify-center mr-2"
        >
          <button
            class="flex items-center focus:outline-none"
            aria-label="Toggle Drawer Menu"
            @click="toggleDrawer()"
          >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300 text-lg"
              aria-hidden="true"
            >
              <UIcon v-if="!showDrawer" name="i-mdi-menu" />
              <UIcon v-else name="i-mdi-close" />
            </span>
          </button>
        </div>
        <!-- title -->
        <slot name="title">
          <Logo />
        </slot>
        <slot name="menu" />
        <!-- options:toggle -->
        <div v-if="$slots['options']" class="flex-1 flex justify-end space-x-2 lg:hidden">
          <button
            class="flex items-center focus:outline-none"
            @click="openSearchModal()"
          >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300 text-sm"
              aria-hidden="true"
            >
              <UIcon name="i-mdi-magnify" class="text-xl"/>
            </span>
          </button>
          <ModalSearch />

          <button
            class="flex items-center focus:outline-none"
            aria-label="Toggle Options Menu"
            @click="toggleOptions()"
          >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300 text-sm"
              aria-hidden="true"
            >
              <UIcon name="i-mdi-dots-vertical" class="text-xl"/>
            </span>
          </button>
        </div>
      </div>
    </Container>
    <ClientOnly>
      <Teleport to="#app-after">
        <!-- drawer -->
        <Transition name="slide-fade-from-up" mode="out-in">
          <div
            v-if="showDrawer && $slots['drawer']"
            class="fixed lg:hidden bg-gray-100 dark:bg-slate-800 pt-12 top-0 left-0 w-screen h-screen z-30 flex flex-col"
          >
            <div class="flex-1 flex flex-col relative overflow-y-auto">
              <slot name="drawer" :toggle-drawer="toggleDrawer" />
            </div>
          </div>
        </Transition>

        <!-- options -->
        <div v-if="showOptions && $slots['options']">
          <slot
            name="options"
            :toggle-options="toggleOptions"
            :show-options="showOptions"
          />
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped>
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

a.router-link-active {
  font-weight: bold;
}
/* a.router-link-exact-active {
  color: theme('colors.slate.900');
} */
/* html.dark {
  a.router-link-exact-active {
    color: theme('colors.white');
  }
} */
</style>
