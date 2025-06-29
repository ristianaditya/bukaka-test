<template>
  <div class="flex justify-between">
    <div class="flex">
      <div
        tabindex="0"
        role="button"
        class="mr-4 text-slate-800 lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <p class="-mt-2 mb-7 text-[22px] font-[600] text-slate-800">
        {{ activePage.page }}{{ activePage.child }}
      </p>
      <div
        v-show="activePage.create"
        class="btn btn-circle btn-sm -mt-[6px] ml-3 text-[#2961A6] border-white bg-[#F0F2FD] hover:bg-[#BBC5FC] hover:border-white"
        @click="openModal()"
      >
        <Icon name="material-symbols:add" class="text-2xl" />
      </div>
    </div>
    <button
      v-show="activePage.submit"
      class="btn btn-ghost btn-sm bg-[#0061A6] text-white hover:bg-[#03426F]"
      @click="submit()"
    >
      <Icon name="formkit:submit" class="text-xl" />
      Submit
    </button>
  </div>
</template>

<script setup>
import { useActivePage, useSessionData } from "@/store/index";

const activePage = useActivePage();
const isOpen = ref(false);
const emit = defineEmits(["open", "submit"]);
function openModal() {
  emit("open");
}
function submit() {
  emit("submit");
}
</script>
