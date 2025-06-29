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
          :initial-values="dataVendors"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <button v-show="false" ref="submitForm" type="submit">
            Save Changes
          </button>
          <BaseInputAlternate
            name="vendor_name"
            type="text"
            label="Vendor Name"
            icon="i-heroicons-users"
            desc="used for vendor list name."
            v-model="dataVendors.vendor_name"
          />
          <BaseInputAlternate
            name="email"
            type="text"
            label="Email"
            icon="i-heroicons-envelope"
            desc="used for email vendor."
            v-model="dataVendors.email"
          />
          <BaseInputAlternate
            name="contact_person"
            type="number"
            label="Contact Person"
            icon="i-heroicons-device-phone-mobile"
            desc="used for contact person vendor."
            v-model="dataVendors.contact_person"
          />
          <BaseInputAlternate
            name="phone"
            type="number"
            label="Phone"
            icon="i-heroicons-phone"
            desc="used for phone vendor."
            v-model="dataVendors.phone"
          />
          <BaseInputAlternateTextArea
            name="address"
            label="Address"
            desc="used for address vendor."
            v-model="dataVendors.address"
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
const dataVendors = reactive({
  vendor_name: "",
  contact_person: "",
  email: "",
  phone: "",
  address: "",
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
  vendor_name: yup.string().required().min(3).max(322),
  email: yup.string().required().email(),
  address: yup.string().required().min(3).max(64),
  contact_person: yup.number().required("number phone is a required field"),
  phone: yup.number().required("number phone is a required field"),
});

const handleSubmit = async () => {
  submitForm.value?.click();
};

async function onSubmit(values) {
  stateLoading.value = true;

  try {
    if (!!!props.idModal) {
      await usePostData(`/vendors/create`, values).then((res) => {
        if (res.status == 201) {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: "Vendor successfully created",
            color: "green",
            timeout: 3000,
          });
          emit("confirm");
        }
      });
    } else {
      await usePostData(`/vendors/update/${props.idModal}`, values).then(
        (res) => {
          if (res.status == 200) {
            toast.add({
              icon: "i-heroicons-check-circle",
              title: "Vendor successfully updated",
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
    await useGetData(`/vendors/${props.idModal}`).then((res) => {
      if (res.success) {
        dataVendors.vendor_name = res.data.vendor_name;
        dataVendors.contact_person = res.data.contact_person;
        dataVendors.phone = res.data.phone;
        dataVendors.email = res.data.email;
        dataVendors.address = res.data.address;
      }
    });
  }
  pageLoad.value = false;
});
</script>
