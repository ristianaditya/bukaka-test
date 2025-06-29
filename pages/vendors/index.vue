<template>
  <div>
    <BaseHeaderNavigation @open="openModalForm()" />
    <div v-if="stateLoad">
      <div class="w-full max-w-full">
        <div
          class="shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 bg-white bg-clip-border"
        >
          <div class="table-responsive">
            <DataTable
              class="table-flush content-table table display text-slate-500"
            >
              <thead class="thead-light">
                <tr>
                  <th>No</th>
                  <th>Vendor Name</th>
                  <th>Email</th>
                  <th>Contant Person</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full max-w-full">
        <div
          class="shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 bg-white bg-clip-border"
        >
          <div class="table-responsive">
            <DataTable
              class="table-flush content-table table display text-slate-500"
            >
              <thead class="thead-light">
                <tr>
                  <th>No</th>
                  <th>Vendor Name</th>
                  <th>Email</th>
                  <th>Contant Person</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="vendor in listVendors" :key="vendor.id">
                  <td class="text-sm font-normal leading-normal">
                    {{ pageNumber++ }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ vendor.vendor_name }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ vendor.email }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ vendor.contact_person }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ vendor.phone }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ vendor.address }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    <div class="items-center flex gap-1">
                      <UTooltip text="Edit" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="yellow"
                          :ui="{
                            rounded: 'rounded-md',
                          }"
                          @click="openEditModalForm(vendor.id)"
                        >
                          <template #trailing>
                            <Icon
                              name="solar:info-square-broken"
                              class="text-2xl text-[#faa662]"
                            />
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip text="Delete" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="red"
                          :ui="{
                            rounded: 'rounded-md',
                          }"
                          @click="openModalDelete(vendor.id)"
                        >
                          <template #trailing>
                            <Icon
                              name="ic:baseline-delete-forever"
                              class="text-2xl text-[#fa6262]"
                            />
                          </template>
                        </UButton>
                      </UTooltip>
                    </div>
                  </td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <BaseModals
      :open-modal="state.isOpenDelete"
      title-modal="Confirm to delete"
      desc-modal="Are you sure you want to delete your data ? "
      icon-modal="i-heroicons-exclamation-triangle"
      text-confirm="Delete"
      type-modal="danger"
      @close="state.isOpenDelete = false"
      @confirm="confirmDelete()"
    />
    <BaseModalsForm
      :open-modal="state.isOpenForm"
      title-modal="Form Vendor"
      desc-modal="This form is used to add and update the vendors list."
      @close="state.isOpenForm = false"
    >
      <template #body>
        <div>
          <VendorForm
            :id-modal="state.idItems"
            @close="state.isOpenForm = false"
            @confirm="confirmSave()"
          />
        </div>
      </template>
    </BaseModalsForm>
    <UNotifications />
  </div>
</template>
<script setup>
import { useActivePage } from "@/store/index";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-dt";

DataTable.use(DataTablesCore);

import { useGetData } from "~/composables/useFetchData";

definePageMeta({
  middleware: "auth",
});

const toast = useToast();
const listVendors = ref();
const stateLoad = ref(true);
const pageNumber = ref(1);

const state = reactive({
  isOpenDelete: false,
  isOpenForm: false,
  idItems: "",
});

function openModalDelete(id) {
  state.idItems = id;
  state.isOpenDelete = true;
}

function openEditModalForm(id) {
  state.idItems = id;
  state.isOpenForm = true;
}

function openModalForm() {
  state.idItems = "";
  state.isOpenForm = true;
}

async function confirmDelete() {
  await usePostData(`/vendors/delete/${state.idItems}`);
  state.isOpenDelete = false;
  stateLoad.value = true;
  await useGetData("/vendors").then((res) => {
    listVendors.value = res.data;
  });
  toast.add({
    icon: "i-heroicons-check-circle",
    title: "Vendor successfully deleted",
    color: "green",
    timeout: 3000,
  });
  pageNumber.value = 1;
  stateLoad.value = false;
}

async function confirmSave() {
  stateLoad.value = true;
  state.isOpenForm = false;
  await useGetData("/vendors").then((res) => {
    listVendors.value = res.data;
  });
  pageNumber.value = 1;
  stateLoad.value = false;
}

onMounted(async () => {
  const activePage = useActivePage();
  activePage.page = "Vendors";
  activePage.child = "";
  activePage.create = true;
  activePage.submit = false;

  await useGetData("/vendors").then((res) => {
    listVendors.value = res.data;
  });
  stateLoad.value = false;
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-responsive-dt";
@import url("~/assets/css/table.css");
</style>
