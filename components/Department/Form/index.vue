<template>
  <div>
    <UContainer
      v-if="pageLoad"
      class="flex h-[40vh] items-center justify-center text-center"
    >
      <span class="loading loading-spinner loading-lg text-[#49479F]"></span>
    </UContainer>
    <div v-else>
      <div class="flex flex-col items-center py-5">
        <Form
          class="w-full"
          :initial-values="dataDepartments"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <button v-show="false" ref="submitForm" type="submit">
            Save Changes
          </button>
          <BaseInputAlternate
            name="name"
            type="text"
            label="Name of Department"
            icon="i-heroicons-user-group"
            desc="used for department list name."
            v-model="dataDepartments.name"
          />
        </Form>
      </div>
      <div class="mt-6 sm:flex sm:flex-row-reverse">
        <button
          class="linear active:bg-brand-700 inline-flex items-center justify-center rounded-[8px] bg-[#0061A6] px-4 py-3 text-xs font-medium text-white transition duration-200 hover:bg-[#2b2a61]"
          @click="handleSubmit"
        >
          <div v-if="stateLoading">
            <span class="loading loading-spinner mr-2 h-3 w-3"></span>
            Saving..
          </div>
          <div v-else>Save Changes</div>
        </button>
        <button
          class="linear active:bg-brand-700 mr-3 inline-flex items-center justify-center rounded-[8px] bg-blue-50 px-4 py-3 text-xs font-medium text-blue-500 transition duration-200 hover:bg-blue-100"
          @click="closedModal"
        >
          <div>Cancel</div>
        </button>
      </div>
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
const dataDepartments = reactive({
  name: "",
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
  name: yup.string().required().min(3).max(322),
});

const handleSubmit = async () => {
  submitForm.value?.click();
};

async function onSubmit(values) {
  stateLoading.value = true;

  try {
    if (!!!props.idModal) {
      await usePostData(`/departments/create`, values).then((res) => {
        if (res.status == 201) {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: "Department successfully created",
            color: "green",
            timeout: 3000,
          });
          emit("confirm");
        }
      });
    } else {
      await usePostData(`/departments/update/${props.idModal}`, values).then(
        (res) => {
          if (res.status == 200) {
            toast.add({
              icon: "i-heroicons-check-circle",
              title: "Department successfully updated",
              color: "green",
              timeout: 3000,
            });
            emit("confirm");
          }
        },
      );
    }
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

onMounted(async () => {
  if (!!props.idModal) {
    await useGetData(`/departments/${props.idModal}`).then((res) => {
      if (res.success) {
        dataDepartments.name = res.data.name;
      }
    });
  }
  pageLoad.value = false;
});
</script>
