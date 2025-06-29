<template>
  <div>
    <h6
      class="text-blue-gray-900 mb-2 block w-full font-sans text-base font-semibold leading-relaxed tracking-normal antialiased"
    >
      {{ label }} <a class="text-red-600">*</a>
    </h6>
    <div class="relative mb-5 mt-1" style="margin-bottom: 1.25rem !important">
      <div class="relative">
        <textarea
          v-model="value"
          :name="name"
          rows="5"
          :class="errorMessage ? 'border-[#ff6363]' : 'border-[#F4F0FD]'"
          class="form-textarea focus:ring-primary-500 relative block w-full resize-none rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-75"
        ></textarea>
      </div>
      <p class="mt-2 text-sm text-red-500 dark:text-red-400">
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
});
const { value, errorMessage } = useField(() => props.name);
</script>
