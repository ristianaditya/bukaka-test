<template>
  <div>
    <h3 v-show="label" class="text-md font-bold text-gray-800">{{ label }}</h3>
    <p v-show="desc" class="mb-3 text-sm text-gray-600">
      {{ desc }}
    </p>
    <div class="relative mb-5 mt-1">
      <div class="relative">
        <input
          v-model="value"
          :name="name"
          :type="type"
          class="form-input text-md relative block w-full rounded-md border-0 bg-white px-3 py-2 ps-[90px] text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#49479F] disabled:cursor-not-allowed disabled:opacity-75"
          autocomplete="off"
        />
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center px-3"
        >
          <span class="text-sm text-gray-500">invitePlus / </span>
        </span>
      </div>
      <p class="mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
  import { useField } from 'vee-validate'
  const props = defineProps({
    name: String,
    type: String,
    label: String,
    desc: String,
  })
  const { value, errorMessage } = useField(() => props.name)
</script>
