<template>
  <div>
    <h3
      v-show="label"
      class="!text-[14px] mb-[2px] font-semibold text-gray-700"
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
        <input
          v-model="value"
          :name="name"
          :type="type"
          class="form-input text-md relative block w-full rounded-md border-0 bg-white py-2 ps-10 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#49479F] disabled:cursor-not-allowed disabled:opacity-75"
          autocomplete="off"
        />
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center px-3"
          ><UIcon
            :name="icon"
            class="h-5 w-5 flex-shrink-0 text-gray-400"
          ></UIcon
        ></span>
      </div>
      <p class="mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  type: String,
  label: String,
  icon: String,
  desc: String,
});
const { value, errorMessage } = useField(() => props.name);
</script>
