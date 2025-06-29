<template>
  <TransitionRoot appear :show="props.openModal" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div
          class="relative min-h-screen px-4 md:flex md:items-center md:justify-center"
        >
          <div
            class="absolute inset-0 z-10 h-full w-full bg-black opacity-25"
          ></div>
          <div
            class="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-5 md:relative md:mx-auto md:max-w-md"
          >
            <div class="items-center md:flex">
              <div
                class="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-gray-300"
              >
                <Icon name="ph:seal-warning-bold" class="text-4xl" />
              </div>
              <div class="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                <p class="text-xl font-bold">Sign out</p>
                <p class="mt-1 text-sm text-gray-700">
                  Are you sure you would like to sign out of your Invite Plus
                  account?
                </p>
              </div>
            </div>
            <div class="mt-4 text-center md:flex md:justify-end md:text-right">
              <button
                class="block w-full rounded-lg bg-red-200 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-300 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
                @click="confirmModal"
              >
                Sign out !
              </button>
              <button
                class="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-300 md:order-1 md:mt-0 md:inline-block md:w-auto md:py-2"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog } from "@headlessui/vue";

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "confirm"]);

function closeModal() {
  emit("close");
}
function confirmModal() {
  emit("confirm");
}
</script>
