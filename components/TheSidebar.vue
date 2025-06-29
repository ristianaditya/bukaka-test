<template>
  <div
    class="bg-white relative hidden w-full flex-shrink-0 flex-col items-stretch border-r border-gray-200 lg:flex lg:w-[260px]"
  >
    <!-- Header dengan design minimal -->
    <div
      class="h-[4rem] flex justify-center min-w-0 items-center border-b border-gray-100 px-6"
    >
      <div class="flex items-center text-xl font-semibold text-gray-900">
        <div
          class="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center mr-3"
        >
          <div class="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        Bukaka
        <div class="text-blue-600 ml-2 font-normal">Test</div>
      </div>
    </div>

    <div class="relative flex w-full flex-1 flex-col overflow-hidden">
      <div class="flex min-h-0 flex-grow flex-col py-6">
        <!-- Navigation Menu dengan design clean -->
        <div class="flex flex-1 flex-col overflow-y-auto px-4">
          <nav class="space-y-1">
            <div v-for="navigation in NAVIGATION_MENU" :key="navigation.label">
              <NuxtLink
                :to="navigation.link"
                class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150"
                :class="
                  navigation.label == activePage.page
                    ? 'text-blue-700 bg-blue-50 border-l-3 border-blue-600 ml-0 pl-3'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                "
                draggable="false"
              >
                <Icon
                  :name="navigation.icon"
                  class="h-5 w-5 flex-shrink-0"
                  :class="
                    navigation.label == activePage.page
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-blue-600'
                  "
                />
                <span class="truncate">{{ navigation.label }}</span>
              </NuxtLink>
            </div>
          </nav>
        </div>

        <!-- Divider -->
        <div class="mx-4 my-4 border-t border-gray-100"></div>

        <!-- Profile section dengan design minimal -->
        <div class="px-4">
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
          >
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <!-- Profile avatar simple -->
              <div class="relative">
                <div
                  class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <NuxtIcon
                    name="images/profile"
                    filled
                    class="text-lg text-white"
                  />
                </div>
                <!-- Online status -->
                <div
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                ></div>
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ session.user?.name }}
                </p>
                <p class="text-xs text-green-600 font-medium">Online</p>
              </div>
            </div>

            <!-- Dropdown menu -->
            <UDropdown
              :items="items"
              :ui="{ item: { disabled: 'cursor-text select-text' } }"
              :popper="{ placement: 'top-start' }"
            >
              <button
                class="p-1.5 rounded-md hover:bg-gray-200 transition-colors duration-150"
              >
                <NuxtIcon
                  name="navigation/dots-icon"
                  filled
                  class="text-sm text-gray-500"
                />
              </button>

              <template #account="{ item }">
                <div class="text-left px-3 py-2">
                  <p class="text-xs text-gray-500">Signed in as</p>
                  <p class="truncate font-medium text-gray-900 text-sm mt-1">
                    {{ item.label }}
                  </p>
                </div>
              </template>

              <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>
                <UIcon
                  :name="item.icon"
                  class="ms-auto h-4 w-4 flex-shrink-0 text-gray-500"
                />
              </template>
            </UDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal tetap sama -->
  <BaseModalsForm
    :open-modal="state.isOpenForm"
    title-modal="Setting Profile"
    desc-modal="This form is used to setting profile."
    @close="state.isOpenForm = false"
  >
    <template #body>
      <SettingProfile
        @close="state.isOpenForm = false"
        @confirm="state.isOpenForm = true"
      />
    </template>
  </BaseModalsForm>
</template>

<script setup>
import { NAVIGATION_MENU } from "~/common/constant/navigation";
import { useActivePage } from "@/store/index";

const activePage = useActivePage();
const { signOut, getSession } = useAuth();
const session = await getSession();

const state = reactive({
  isOpenForm: false,
  idProjectModal: "",
  isOpenDelete: false,
  idItems: "",
});

const items = [
  [
    {
      label: session.user?.email,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      click: () => {
        state.isOpenForm = true;
      },
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        signOut({ callbackUrl: "/login" });
      },
    },
  ],
];
</script>
