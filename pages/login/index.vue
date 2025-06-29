<template>
  <section
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-bounce delay-500"
      ></div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 text-blue-300/40 animate-float">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
          />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </div>
      <div
        class="absolute top-40 right-32 text-indigo-300/40 animate-float-delayed"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div class="absolute bottom-32 left-40 text-purple-300/40 animate-bounce">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-10"
    >
      <div
        class="w-full bg-white/80 backdrop-blur-xl rounded-2xl md:mt-0 sm:max-w-md xl:p-0 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="p-8 space-y-6">
          <div class="text-center">
            <h4 class="text-gray-800 text-2xl font-bold mb-2">Sign In</h4>
            <p class="text-gray-600 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <div v-if="pageError" class="animate-shake">
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
                <span class="font-semibold"
                  >Your email or password is incorrect!</span
                >
              </div>
            </div>
          </div>

          <form class="space-y-6" @submit.prevent="onSubmit">
            <div class="space-y-4">
              <div class="relative group">
                <BaseInput
                  name="email"
                  type="text"
                  label="Email Address"
                  placeholder="Enter your email"
                  icon="ic:round-email"
                  v-model="form.email"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>

              <div class="relative group">
                <BaseInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  icon="mdi:password"
                  v-model="form.password"
                  class="transition-all duration-200 focus-within:scale-[1.02]"
                />
              </div>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span class="ml-2 text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <UButton
              size="xl"
              type="submit"
              block
              color="blue"
              variant="solid"
              class="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
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
                Signing in...
              </div>
              <div v-else class="flex items-center justify-center">
                Sign In
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </UButton>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"
                  >Or continue with</span
                >
              </div>
            </div>
            <p class="text-center text-sm text-gray-600">
              Don't have an account yet?
              <NuxtLink
                to="/register"
                class="ml-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Create account
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>&copy; 2025 Bukaka Test Company. All rights reserved.</p>
      </div>
    </div>
  </section>
  <UNotifications />
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
  },
});

const { signIn } = useAuth();
const form = reactive({
  email: "",
  password: "",
});
const stateLoading = ref(false);
const pageError = ref(false);
const status = ref(false);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().min(7).email(),
    password: yup.string().required().min(8),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    stateLoading.value = true;
    const { error } = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (error) {
      stateLoading.value = false;
      pageError.value = true;
      status.value = false;
    } else {
      stateLoading.value = false;
      status.value = false;
      return navigateTo("/", { external: true });
    }
  } catch (error) {
    console.error("Error during form submission", error);
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
