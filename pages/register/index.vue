<template>
  <section
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-bounce delay-500"
      ></div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 text-indigo-300/40 animate-float">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      </div>
      <div
        class="absolute top-40 right-32 text-blue-300/40 animate-float-delayed"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="absolute bottom-32 left-40 text-blue-300/40 animate-bounce">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div class="absolute top-32 left-1/2 text-indigo-300/30 animate-pulse">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center px-6 py-12 min-h-screen mx-auto relative z-10"
    >
      <div
        class="w-full bg-white/80 backdrop-blur-xl rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="p-8 space-y-6">
          <div class="text-center">
            <h4 class="text-gray-800 text-2xl font-bold mb-2">
              Create Account
            </h4>
            <p class="text-gray-600 text-sm">
              Fill in your information to get started
            </p>
          </div>

          <div v-if="alertState.show" class="animate-shake">
            <div
              class="rounded-xl bg-red-50 p-4 text-sm text-red-800 border-l-4 border-red-400 relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-red-100/50 animate-pulse"></div>
              <div class="relative flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span class="font-semibold">{{ alertState.message[0] }}</span>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form class="space-y-5" @submit.prevent="onSubmit">
            <div class="space-y-4">
              <div class="relative group">
                <BaseInput
                  name="name"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon="icon-park-solid:edit-name"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>

              <div class="relative group">
                <BaseInput
                  name="email"
                  type="text"
                  label="Email Address"
                  placeholder="Enter your email"
                  icon="ic:round-email"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>

              <div class="relative group">
                <BaseInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create a password"
                  icon="mdi:password"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>

              <div class="relative group">
                <BaseInput
                  name="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  icon="mdi:password"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>
            </div>

            <div class="flex items-start">
              <input
                type="checkbox"
                id="terms"
                class="w-4 h-4 mt-1 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                required
              />
              <label for="terms" class="ml-3 text-sm text-gray-700">
                I agree to the
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                  >Terms of Service</a
                >
                and
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                  >Privacy Policy</a
                >
              </label>
            </div>

            <UButton
              size="xl"
              type="submit"
              block
              color="blue"
              variant="solid"
              class="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
              ></div>
              <div v-if="stateLoading" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </div>
              <div v-else class="flex items-center justify-center">
                Create Account
                <svg
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </UButton>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <p class="text-center text-sm text-gray-600">
              Already have an account?
              <NuxtLink
                to="/login"
                class="ml-1 font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
              >
                Sign in here
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2025 Bukaka Test. All rights reserved.</p>
      </div>
    </div>
  </section>
  <UNotifications />
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { usePostRegis } from "~/composables/useFetchData";

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
  },
});

const toast = useToast();
const stateLoading = ref(false);
const alertState = reactive({
  show: false,
  message: "",
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required().min(3).max(16),
    email: yup.string().required().min(7).email(),
    password: yup.string().required().min(8),
    password_confirmation: yup
      .string()
      .required("password confirmation is a required field")
      .min(6, "password confirmation must be at least 6 characters")
      .oneOf([yup.ref("password")], "Passwords must match"),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    stateLoading.value = true;
    await usePostRegis("/register", values).then((res) => {
      console.log({ res });

      if (res.status == 422) {
        stateLoading.value = false;
        alertState.show = true;
        alertState.message =
          res._data.name ||
          res._data.email ||
          res._data.sim ||
          res._data.no_phone;
      } else {
        stateLoading.value = false;
        alertState.show = false;
        toast.add({
          icon: "i-heroicons-check-circle",
          title: "account successfully created",
          color: "green",
          timeout: 2000,
        });
        navigateTo("/login");
      }
    });
  } catch (error) {
    stateLoading.value = false;
    toast.add({
      icon: "i-heroicons-exclamation-triangle",
      title: "error api service",
      color: "orange",
      timeout: 2000,
    });
  }
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
