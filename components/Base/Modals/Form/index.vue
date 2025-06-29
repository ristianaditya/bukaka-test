<template>
  <TransitionRoot appear :show="props.openModal" as="template">
    <Dialog as="div" class="relative z-10" @close="closedModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex-column flex">
                <h1
                  class="!text-lg !font-bold text-gray-700"
                  style="
                    font-family: unset !important;
                    margin-bottom: 0px !important;
                    margin-top: 0px !important;
                    font-family: unset !important;
                    line-height: unset !important;
                  "
                >
                  {{ titleModal }}
                </h1>
              </div>
              <div class="mb-3 mt-1">
                <p
                  class="!text-sm !text-gray-500"
                  style="
                    font-family: unset !important;
                    margin-bottom: 0px !important;
                    margin-top: 0px !important;
                  "
                >
                  {{ descModal }}
                </p>
              </div>
              <slot name="body" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  titleModal: {
    type: String,
    default: "",
  },
  descModal: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

function closedModal() {
  emit("close");
}
</script>
