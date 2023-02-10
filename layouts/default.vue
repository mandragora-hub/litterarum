<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <Navbar>
          <template #drawer>
            <Sidebar mode="mobile" />
          </template>
        </Navbar>
      </slot>
      <div class="flex-1 w-full flex flex-col">
        <div class="relative flex-1 mx-auto max-w-8xl w-full h-full">
          <div class="flex flex-col">
            <slot />
            <slot name="footer">
              <Footer />
            </slot>
          </div>
        </div>
      </div>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
