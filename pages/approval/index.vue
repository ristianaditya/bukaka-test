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
                  <td
                    v-if="dataUser.role == 'hod'"
                    class="text-xs font-normal leading-normal w-28 text-gray-500"
                  >
                    <UTooltip
                      class="mr-2"
                      text="Download Pdf"
                      :popper="{ offsetDistance: 16 }"
                    >
                      <UButton
                        variant="ghost"
                        color="red"
                        @click="generatePDF(pr.id)"
                        :ui="{
                          rounded: 'rounded-md',
                        }"
                      >
                        <template #trailing>
                          <Icon
                            name="hugeicons:pdf-02"
                            class="text-3xl text-[#d13333]"
                          />
                        </template>
                      </UButton>
                    </UTooltip>
                    <div v-if="pr.status_approval == 2" class="text-center">
                      <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                        >APPROVED</span
                      >
                      by HOD
                    </div>
                    <div
                      v-else-if="pr.status_approval == 4"
                      class="text-center"
                    >
                      <span
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset"
                        >REJECTED</span
                      >
                      by HOD
                    </div>
                    <div v-else class="items-center flex gap-1 w-28">
                      <UTooltip text="Send" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="blue"
                          @click="openModalSendApproval(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                            size: 'sm',
                          }"
                        >
                          <template class="text-[#0061A6]" #trailing>
                            <Icon
                              name="solar:check-circle-broken"
                              class="text-2xl text-[#0061A6]"
                            />
                            Approve
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip text="Reject" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="red"
                          @click="openModalReject(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                            size: 'sm',
                          }"
                        >
                          <template class="text-[#a60000]" #trailing>
                            <Icon
                              name="solar:close-circle-broken"
                              class="text-2xl text-[#a60000]"
                            />
                            Reject
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip
                        text="Download Pdf"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="ghost"
                          color="red"
                          @click="generatePDF(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                          }"
                        >
                          <template #trailing>
                            <Icon
                              name="hugeicons:pdf-02"
                              class="text-3xl text-[#d13333]"
                            />
                          </template>
                        </UButton>
                      </UTooltip>
                    </div>
                  </td>
                  <td
                    v-else
                    class="text-xs font-normal leading-normal w-28 text-gray-500 flex"
                  >
                    <UTooltip
                      class="mr-2"
                      text="Download Pdf"
                      :popper="{ offsetDistance: 16 }"
                    >
                      <UButton
                        variant="ghost"
                        color="red"
                        @click="generatePDF(pr.id)"
                        :ui="{
                          rounded: 'rounded-md',
                        }"
                      >
                        <template #trailing>
                          <Icon
                            name="hugeicons:pdf-02"
                            class="text-3xl text-[#d13333]"
                          />
                        </template>
                      </UButton>
                    </UTooltip>
                    <div class="text-center" v-if="pr.status_approval == 1">
                      <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                        >APPROVED</span
                      >
                      by Manager
                    </div>
                    <div
                      class="text-center"
                      v-else-if="pr.status_approval == 2"
                    >
                      <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                        >APPROVED</span
                      >
                      by HOD
                    </div>
                    <div
                      class="text-center"
                      v-else-if="pr.status_approval == 3"
                    >
                      <span
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset"
                        >REJECTED</span
                      >
                      by Manager
                    </div>
                    <div
                      class="text-center"
                      v-else-if="pr.status_approval == 4"
                    >
                      <span
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset"
                        >REJECTED</span
                      >
                      by HOD
                    </div>
                    <div v-else class="items-center flex gap-1 w-28">
                      <UTooltip
                        v-if="
                          dataUser.role == 'manager' || dataUser.role == 'admin'
                        "
                        text="Send"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="soft"
                          color="blue"
                          @click="openModalSendApproval(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                            size: 'sm',
                          }"
                        >
                          <template class="text-[#0061A6]" #trailing>
                            <Icon
                              name="solar:check-circle-broken"
                              class="text-2xl text-[#0061A6]"
                            />
                            Approve
                          </template>
                        </UButton>
                      </UTooltip>
                      <UTooltip
                        v-if="
                          dataUser.role == 'manager' || dataUser.role == 'admin'
                        "
                        text="Reject"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="soft"
                          color="red"
                          @click="openModalReject(pr.id)"
                          :ui="{
                            rounded: 'rounded-md',
                            size: 'sm',
                          }"
                        >
                          <template class="text-[#a60000]" #trailing>
                            <Icon
                              name="solar:close-circle-broken"
                              class="text-2xl text-[#a60000]"
                            />
                            Reject
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
      :open-modal="state.isOpenSendApproval"
      title-modal="Confirm Approval"
      desc-modal="Are you sure you want to approve this Purchase Requisition? Once approved, this action cannot be undone."
      @close="state.isOpenSendApproval = false"
    >
      <template #body>
        <div class="flex justify-end gap-3 mt-4">
          <UButton
            variant="outline"
            color="gray"
            @click="state.isOpenSendApproval = false"
          >
            Cancel
          </UButton>
          <UButton variant="solid" color="blue" @click="confirmApprove()">
            Approve PR
          </UButton>
        </div>
      </template>
    </BaseModalsForm>

    <BaseModalsForm
      :open-modal="state.isOpenReject"
      title-modal="Confirm Reject"
      desc-modal="Are you sure you want to reject this Purchase Requisition? Once reject, this action cannot be undone."
      @close="state.isOpenReject = false"
    >
      <template #body>
        <div class="flex justify-end gap-3 mt-4">
          <UButton
            variant="outline"
            color="gray"
            @click="state.isOpenReject = false"
          >
            Cancel
          </UButton>
          <UButton variant="solid" color="red" @click="confirmReject()">
            Reject PR
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

const statusType = [
  "",
  "Approved by Manager",
  "Approved by HOD",
  "Rejected by Manager",
  "Rejected by HOD",
];

const state = reactive({
  isOpenDelete: false,
  isOpenForm: false,
  isOpenSendApproval: false,
  isOpenReject: false,
  idItems: "",
});
const dataUser = reactive({
  name: "",
  email: "",
  role: "user",
});

const generatePDF = async (id) => {
  try {
    const response = await usePostData(`/pr_req/${id}`);

    if (!response._data || !response._data.data) {
      throw new Error("Failed to fetch data from backend");
    }

    const backendData = response._data.data;
    const purchaseRequisitionData = {
      id: backendData.id,
      estimated_price: backendData.total_estimated_price,
      pr_no: backendData.pr_no,
      req_date: backendData.req_date,
      remarks: backendData.remarks,
      req_date: backendData.req_date,
      department: backendData.department.name,
      items: backendData.items,
      status: backendData.status,
      email: backendData.user.email,
      username: backendData.user.name,
      total_cost: backendData.total_estimated_price,
      status_approval: statusType[backendData.status_approval ?? 0],
    };

    const { PurchaseRequisitionPDF } = await import("~/utils/pdfPrApproval.js");
    const pdfGenerator = new PurchaseRequisitionPDF();

    const doc = pdfGenerator.generatePDF(purchaseRequisitionData);

    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:]/g, "-");

    // Save PDF
    pdfGenerator.preview(`purchase-requisition-${timestamp}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};

function openDetailForm() {
  router.push(`/pr/detail/`);
}

function openModalSendApproval(id) {
  state.idItems = id;
  state.isOpenSendApproval = true;
}

function openModalReject(id) {
  state.idItems = id;
  state.isOpenReject = true;
}

function formatRupiah(value) {
  if (!value) return "Rp. 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

async function confirmReject() {
  try {
    state.isOpenReject = false;
    stateLoad.value = true;

    await usePostData(`/approval/reject/${state.idItems}`);

    await useGetData("/approval").then((res) => {
      listPr.value = res.data;
    });

    pageNumber.value = 1;
    stateLoad.value = false;

    toast.add({
      icon: "i-heroicons-paper-airplane",
      title: "Purchase Requisition successfully rejected",
      color: "blue",
      timeout: 3000,
    });
  } catch (error) {
    state.isOpenReject = false;
    toast.add({
      icon: "i-heroicons-x-circle",
      title: "Failed to reject Purchase Requisition",
      description: error.message || "An error occurred while reject the PR",
      color: "red",
      timeout: 5000,
    });
  }
}

async function confirmApprove() {
  try {
    state.isOpenSendApproval = false;
    stateLoad.value = true;

    await usePostData(`/approval/send/${state.idItems}`);

    await useGetData("/approval").then((res) => {
      listPr.value = res.data;
    });

    pageNumber.value = 1;
    stateLoad.value = false;

    toast.add({
      icon: "i-heroicons-paper-airplane",
      title: "Purchase Requisition successfully approved",
      color: "blue",
      timeout: 3000,
    });
  } catch (error) {
    state.isOpenSendApproval = false;
    toast.add({
      icon: "i-heroicons-x-circle",
      title: "Failed to approve Purchase Requisition",
      description: error.message || "An error occurred while approve the PR",
      color: "red",
      timeout: 5000,
    });
  }
}

onMounted(async () => {
  const activePage = useActivePage();
  activePage.page = "Approval";
  activePage.child = "";
  activePage.create = false;
  activePage.submit = false;

  await useGetData("/approval/").then((res) => {
    listPr.value = res.data;
  });

  await useGetSession("/user/getSession").then((res) => {
    dataUser.name = res.data?.username;
    dataUser.email = res.data?.email;
    dataUser.role = res.data?.role;
  });

  stateLoad.value = false;
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-responsive-dt";
@import url("~/assets/css/table.css");
</style>
