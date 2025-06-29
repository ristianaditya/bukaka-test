<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <TheSidebar />
    <div class="flex w-full min-w-0 flex-1 bg-white">
      <div class="relative flex w-full flex-1 flex-col items-stretch">
        <div class="h-screen overflow-y-auto px-8 py-12 md:px-20">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <UNotifications />
</template>
