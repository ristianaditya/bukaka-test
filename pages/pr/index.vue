<template>
  <div>
    <BaseHeaderNavigation @open="openDetailForm()" />
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
                  <th>PR No</th>
                  <th>User Request</th>
                  <th>Department</th>
                  <th>PR Date</th>
                  <th>Estimated Cost</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                  <th>PR No</th>
                  <th>User Request</th>
                  <th>Department</th>
                  <th>PR Date</th>
                  <th>Estimated Cost</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pr in listPr" :key="pr.id">
                  <td class="text-sm font-normal leading-normal">
                    {{ pageNumber++ }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ pr.pr_no }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ pr.user.name }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ pr.department.name }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ pr.req_date }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ formatRupiah(pr.total_estimated_price) }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ pr.remarks }}
                  </td>
                  <td class="text-xs leading-normal font-normal text-gray-500">
                    <div v-if="pr.status_approval == 1">
                      <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                        >APPROVED</span
                      >
                      by Manager
                    </div>
                    <div v-else-if="pr.status_approval == 2">
                      <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                        >APPROVED</span
                      >
                      by HOD
                    </div>
                    <div v-else-if="pr.status_approval == 3">
                      <span
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset"
                        >REJECTED</span
                      >
                      by Manager
                    </div>
                    <div v-else-if="pr.status_approval == 4">
                      <span
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset"
                        >REJECTED</span
                      >
                      by HOD
                    </div>
                    <div v-else-if="pr.status == 0">
                      <span
                        class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset"
                        >PENDING</span
                      >
                    </div>
                    <div v-else="pr.status == 0">
                      <span
                        class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-600/20 ring-inset"
                        >SENDING</span
                      >
                    </div>
                  </td>
                  <td class="text-sm font-normal leading-normal w-28">
                    <div class="items-center flex gap-1 w-28">
                      <UTooltip
                        class="mr-5"
                        v-show="pr.status == '0'"
                        text="Send"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="soft"
                          color="blue"
                          @click="openModalSendPR(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                            size: 'sm',
                          }"
                        >
                          <template class="text-[#0061A6]" #trailing>
                            <Icon
                              name="mingcute:send-plane-fill"
                              class="text-2xl text-[#0061A6]"
                            />
                            Send PR
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip text="Detail" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="yellow"
                          @click="
                            () => {
                              navigateTo(`pr/detail/${pr.id}`);
                            }
                          "
                          :ui="{
                            rounded: 'rounded-md',
                          }"
                        >
                          <template #trailing>
                            <Icon
                              name="solar:info-square-broken"
                              class="text-2xl text-[#faa662]"
                            />
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip
                        v-show="pr.status == '0'"
                        text="Delete"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="soft"
                          color="red"
                          @click="openModalDelete(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                          }"
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

    <BaseModalsForm
      :open-modal="state.isOpenDelete"
      title-modal="Confirm Delete"
      desc-modal="Are you sure you want to delete this item? This action cannot be undone."
      @close="state.isOpenDelete = false"
    >
      <template #body>
        <div class="flex justify-end gap-3 mt-4">
          <UButton
            variant="outline"
            color="gray"
            @click="state.isOpenDelete = false"
          >
            Cancel
          </UButton>
          <UButton variant="solid" color="red" @click="confirmDelete()">
            Delete
          </UButton>
        </div>
      </template>
    </BaseModalsForm>

    <BaseModalsForm
      :open-modal="state.isOpenSendPR"
      title-modal="Confirm Send PR"
      desc-modal="Are you sure you want to send this Purchase Requisition? Once sent, it will be submitted for approval."
      @close="state.isOpenSendPR = false"
    >
      <template #body>
        <div class="flex justify-end gap-3 mt-4">
          <UButton
            variant="outline"
            color="gray"
            @click="state.isOpenSendPR = false"
          >
            Cancel
          </UButton>
          <UButton variant="solid" color="blue" @click="confirmSendPR()">
            Send PR
          </UButton>
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

definePageMeta({
  middleware: "auth",
});

const toast = useToast();
const router = useRouter();
const listPr = ref();
const stateLoad = ref(true);
const pageNumber = ref(1);

const state = reactive({
  isOpenDelete: false,
  isOpenForm: false,
  isOpenSendPR: false,
  idItems: "",
});

function openDetailForm() {
  router.push(`/pr/detail/`);
}

function openModalDelete(id) {
  state.idItems = id;
  state.isOpenDelete = true;
}

function openModalSendPR(id) {
  state.idItems = id;
  state.isOpenSendPR = true;
}

function formatRupiah(value) {
  if (!value) return "Rp. 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

async function confirmDelete() {
  await usePostData(`/pr_req/delete/${state.idItems}`);
  state.isOpenDelete = false;
  stateLoad.value = true;
  await useGetData("/pr_req").then((res) => {
    listPr.value = res.data;
  });
  pageNumber.value = 1;
  stateLoad.value = false;
  toast.add({
    icon: "i-heroicons-check-circle",
    title: "Item successfully deleted",
    color: "green",
    timeout: 3000,
  });
}

async function confirmSendPR() {
  try {
    state.isOpenSendPR = false;
    stateLoad.value = true;

    await usePostData(`/pr_req/send/${state.idItems}`);

    await useGetData("/pr_req").then((res) => {
      listPr.value = res.data;
    });

    pageNumber.value = 1;
    stateLoad.value = false;

    toast.add({
      icon: "i-heroicons-paper-airplane",
      title: "Purchase Requisition sent successfully",
      color: "blue",
      timeout: 3000,
    });
  } catch (error) {
    state.isOpenSendPR = false;
    toast.add({
      icon: "i-heroicons-x-circle",
      title: "Failed to send Purchase Requisition",
      description: error.message || "An error occurred while sending the PR",
      color: "red",
      timeout: 5000,
    });
  }
}

onMounted(async () => {
  const activePage = useActivePage();
  activePage.page = "Purchase Requisitions";
  activePage.child = "";
  activePage.create = true;
  activePage.submit = false;

  await useGetData("/pr_req/").then((res) => {
    listPr.value = res.data;
  });

  stateLoad.value = false;
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-responsive-dt";
@import url("~/assets/css/table.css");
</style>
