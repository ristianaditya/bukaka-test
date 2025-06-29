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
        <textarea
          v-model="value"
          :name="name"
          rows="5"
          class="form-textarea relative block w-full resize-none rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#49479F] disabled:cursor-not-allowed disabled:opacity-75"
        ></textarea>
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
  label: String,
  desc: String,
});
const { value, errorMessage } = useField(() => props.name);
</script>
