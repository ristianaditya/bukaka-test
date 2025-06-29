<template>
  <div>
    <h3
      v-show="label"
      class="!text-[14px] mb-[2px] font-semibold text-gray-600"
    >
      {{ label }}
    </h3>
    <p v-show="desc" class="mb-3 text-sm text-gray-600">
      {{ desc }}
    </p>
    <div class="relative mb-5 mt-1 focus:ring-[#49479F]">
      <div class="relative focus:ring-[#49479F]">
        <VueDatePicker
          class="focus:ring-[#49479F]"
          v-model="value"
          :name="name"
          :enable-time-picker="false"
        ></VueDatePicker>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center px-3 rounded-md focus:ring-[#49479F]"
          ><span
            :class="icon"
            class="h-5 w-5 flex-shrink-0 text-gray-400"
          ></span
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  name: String,
  type: String,
  label: String,
  icon: String,
  desc: String,
});
const { value, errorMessage } = useField(() => props.name);
</script>
