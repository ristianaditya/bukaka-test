<template>
  <div class="grid grid-cols-2 gap-2 px-2 py-2">
    <div>
      <div class="flex content-center items-center justify-between">
        <h3 v-show="label" class="text-md font-bold text-gray-800">
          {{ label }}
        </h3>
      </div>
      <p v-show="desc" class="mb-3 text-sm text-gray-600">
        {{ desc }}
      </p>
    </div>
    <div class="relative text-end">
      <input
        v-model="value"
        class="toggle toggle-primary"
        :name="name"
        type="checkbox"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup>
  import { useField } from 'vee-validate'
  const props = defineProps({
    name: String,
    label: String,
    desc: String,
    disabled: Boolean,
  })
  const { value } = useField(() => props.name)
</script>
<style>
  .toggle-primary:checked,
  .toggle-primary[aria-checked='true'] {
    border-color: #23215f;
    background-color: #49479f;
    color: #49479f;
  }
</style>
