<template>
  <div>
    <div class="flex flex-col items-center py-5">
      <Form
        class="w-full"
        :initial-values="dataItems"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <button
          v-show="false"
          ref="submitForm"
          type="submit"
          class="linear hover:bg-brand-800 active:bg-brand-700 inline-flex items-center justify-center rounded-[12px] bg-[#49479F] px-4 py-3 text-sm font-medium text-white transition duration-200"
        >
          Save Changes
        </button>
        <BaseInputAlternate
          name="item_name"
          type="text"
          label="Item Name"
          icon="i-heroicons-information-circle"
          desc="input for name of item."
        />
        <BaseInputAlternateTextArea
          name="description"
          type="text"
          label="Description"
          icon="i-heroicons-user-circle"
          desc="Describe the description of the item."
        />
        <BaseInputAlternate
          name="quantity"
          type="number"
          label="Quantity"
          icon="i-heroicons-chevron-up-down"
          desc="input number of items."
        />
        <BaseInputAlternate
          name="price"
          type="number"
          label="Estimated Cost"
          icon="i-heroicons-currency-dollar"
          desc="input price of items."
        />
      </Form>
    </div>
    <div class="mt-6 sm:flex sm:flex-row-reverse">
      <button
        class="linear active:bg-brand-700 inline-flex items-center justify-center rounded-[8px] bg-[#49479F] px-4 py-3 text-sm font-medium text-white transition duration-200 hover:bg-[#2b2a61]"
        @click="handleSubmit"
      >
        <div v-if="stateLoading">
          <span class="loading loading-spinner mr-2 h-3 w-3"></span>
          Saving..
        </div>
        <div v-else>Save Changes</div>
      </button>
      <button
        class="linear active:bg-brand-700 mr-3 inline-flex items-center justify-center rounded-[8px] bg-blue-50 px-4 py-3 text-sm font-medium text-blue-500 transition duration-200 hover:bg-blue-100"
        @click="closedModal"
      >
        <div>Cancel</div>
      </button>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const submitForm = ref();
const toast = useToast();
const pageLoad = ref(true);
const stateLoading = ref(false);
const dataItems = reactive({
  item_name: "",
  description: "",
  quantity: "",
  price: "",
});

const props = defineProps({
  idModal: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "confirm"]);

function closedModal() {
  emit("close");
}

const schema = yup.object({
  item_name: yup.string().required().min(3).max(322),
  description: yup.string().required().min(3).max(322),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

const handleSubmit = async () => {
  submitForm.value?.click();
};

async function onSubmit(values) {
  stateLoading.value = true;

  try {
    emit("confirm", values);
  } catch (error) {
    toast.add({
      icon: "i-heroicons-exclamation-triangle",
      title: "error api service",
      color: "orange",
      timeout: 3000,
    });
  }

  stateLoading.value = false;
}
</script>
