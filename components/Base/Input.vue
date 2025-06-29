<template>
  <div>
    <h6
      class="text-gray-700 mb-2 block w-full font-sans text-base font-semibold leading-relaxed tracking-normal antialiased"
    >
      {{ label }} <a class="text-red-600">*</a>
    </h6>
    <label>
      <UInput
        :icon="icon"
        v-model="value"
        :color="errorMessage ? 'red' : 'bg-[#006DAD]'"
        :type="props.type || 'text'"
        class="w-full bg-white"
        :class="errorMessage ? 'input-error' : 'border-[#F4F0FD]'"
        size="xl"
        :placeholder="placeholder"
      />
      <div class="mt-2 ml-2 text-sm text-red-700">{{ errorMessage }}</div>
    </label>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  type: String,
  label: String,
  placeholder: String,
  icon: String,
});
const { value, errorMessage } = useField(() => props.name);
</script>
