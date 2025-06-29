<template>
  <div>
    <UContainer
      v-if="pageLoad"
      class="flex h-[70vh] items-center justify-center text-center"
    >
      <span class="loading loading-spinner loading-lg text-indigo-400"></span>
    </UContainer>
    <div v-else>
      <Form
        :initial-values="dataProfile"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <button
          v-show="false"
          ref="submitForm"
          type="submit"
          class="linear hover:bg-brand-800 active:bg-brand-700 inline-flex items-center justify-center rounded-[12px] bg-indigo-400 px-4 py-3 text-sm font-medium text-white transition duration-200"
        >
          Save Changes
        </button>
        <div class="mb-6 mt-7 space-y-4">
          <BaseInputAlternate
            name="name"
            type="text"
            label="Name"
            icon="i-heroicons-user"
            desc="Enter your full name."
            placeholder="Name"
          />
          <BaseInputAlternate
            name="email"
            type="text"
            label="Email"
            icon="i-heroicons-at-symbol"
            desc="Enter your email address."
            placeholder="email@gmail.com"
          />
          <div class="grid gap-2">
            <div>
              <div
                class="flex content-center items-center justify-between text-sm"
              >
                <label class="block font-bold text-gray-700" for="password_new"
                  >Password</label
                >
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Confirm your current password before setting a new one.
              </p>
            </div>
            <div>
              <div class="relative">
                <input
                  id="password"
                  v-model="dataProfile.old_password"
                  name="password"
                  type="password"
                  placeholder="Current password"
                  class="form-input text-md relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:ring-gray-700 dark:focus:ring-indigo-400"
                />
              </div>
              <div class="relative mt-2">
                <input
                  id="password_new"
                  v-model="dataProfile.password"
                  name="password"
                  type="password"
                  placeholder="New password"
                  class="form-input text-md relative block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-75 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:ring-gray-700 dark:focus:ring-indigo-400"
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div class="mt-10 sm:flex sm:flex-row-reverse">
        <UButton
          class="w-28 justify-center bg-indigo-500 text-white hover:bg-indigo-800"
          variant="solid"
          @click="handleSubmit"
        >
          <div v-if="stateLoading">
            <span class="loading loading-spinner mr-2 h-3 w-3"></span>
            Saving..
          </div>
          <div v-else>Save Changes</div>
        </UButton>
        <UButton
          color="red"
          class="mr-3 w-20 justify-center"
          variant="soft"
          @click="closedModal"
        >
          Close
        </UButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import * as yup from "yup";

const toast = useToast();

const submitForm = ref();
const pageLoad = ref(true);
const stateLoading = ref(false);
const idUser = ref("");

const dataProfile = reactive({
  name: "",
  sim: "",
  email: "",
  address: "",
  old_password: "",
  password: "",
});

const emit = defineEmits(["close", "confirm"]);

const schema = yup.object({
  name: yup.string().required().min(3).max(16),
  email: yup.string().required().min(7).email(),
});

async function onSubmit(values) {
  stateLoading.value = true;

  try {
    if (!!dataProfile.old_password) {
      const dataPassword = {
        old_password: dataProfile.old_password,
        password: dataProfile.password,
      };
      await usePostData(
        `/user/updatePassword/${idUser.value}`,
        dataPassword,
      ).then((res) => {
        if (res.status == 200) {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: "Password successfully updated",
            color: "green",
            timeout: 3000,
          });
        } else {
          toast.add({
            icon: "i-heroicons-exclamation-triangle",
            title: "Password failed to update",
            color: "orange",
            timeout: 3000,
          });
        }
      });
    }

    await usePostData(`/user/updateUser/${idUser.value}`, values).then(
      (res) => {
        if (res.status == 422) {
          const jsonError =
            res._data.no_phone || res._data.email || res._data.sim;
          toast.add({
            icon: "i-heroicons-exclamation-triangle",
            title: jsonError[0],
            color: "orange",
            timeout: 3000,
          });
        } else if (res.status == 200) {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: "account successfully updated",
            color: "indigo",
            timeout: 3000,
          });
        }
      },
    );
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

const handleSubmit = async () => {
  submitForm.value?.click();
};

function closedModal() {
  emit("close");
}

onMounted(async () => {
  await useGetSession("/user/getSession").then((res) => {
    idUser.value = res.data.id;
    (dataProfile.name = res.data.name),
      (dataProfile.email = res.data.email),
      (dataProfile.sim = res.data.sim),
      (dataProfile.no_phone = res.data.no_phone),
      (dataProfile.address = res.data.address);
  });
  pageLoad.value = false;
});
</script>
