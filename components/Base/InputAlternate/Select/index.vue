<template>
  <div>
    <h3
      v-show="label"
      class="!text-[14px] mb-[2px] font-semibold text-gray-600"
      style="
        font-family: unset !important;
        line-height: unset !important;
        margin-bottom: 0px !important;
        margin-top: 0px !important;
      "
    >
      {{ label }}
    </h3>
    <p
      v-show="desc"
      class="mb-3 text-sm text-gray-600"
      style="
        font-family: unset !important;
        margin-bottom: 0px !important;
        margin-top: 0px !important;
      "
    >
      {{ desc }}
    </p>
    <div class="relative mb-5 mt-1" style="margin-bottom: 1.25rem !important">
      <div class="relative">
        <USelectMenu
          v-model="value"
          :name="name"
          :placeholder="placeholder"
          :options="listdata"
          :popper="{ arrow: true }"
          class="text-md w-full focus:ring-[#49479F] dark:focus:ring-[#49479F]"
        />
      </div>
      <p class="mt-2 text-sm !text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  label: String,
  desc: String,
  placeholder: String,
  listdata: Array,
});
const { value, errorMessage } = useField(() => props.name);
</script>
<style>
div[id^="headlessui-listbox-button"] > button {
  height: 40px;
  @apply form-input relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#49479F] disabled:cursor-not-allowed disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:ring-gray-700 dark:focus:ring-[#49479F];
}
</style>
