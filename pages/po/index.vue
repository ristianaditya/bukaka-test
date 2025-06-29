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
                  <th>PR NO</th>
                  <th>Vendor</th>
                  <th>PO Date</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Total Cost</th>
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
                  <th>PR NO</th>
                  <th>Vendor</th>
                  <th>PO Date</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="po in listPo" :key="po.id">
                  <td class="text-sm font-normal leading-normal">
                    {{ pageNumber++ }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ po.requisition.pr_no }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ po.vendor.vendor_name }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ po.po_date }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ po.delivery_date }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ statusType[po.status] }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ formatRupiah(po.total_price) }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    <div class="items-center flex gap-1">
                      <UTooltip
                        text="Download Pdf"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="ghost"
                          color="red"
                          @click="generatePDF(po.id)"
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
                      <UTooltip text="Detail" :popper="{ offsetDistance: 16 }">
                        <UButton
                          variant="soft"
                          color="yellow"
                          @click="
                            () => {
                              navigateTo(`po/detail/${po.id}`);
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
                        v-show="po.status == '0'"
                        text="Delete"
                        :popper="{ offsetDistance: 16 }"
                      >
                        <UButton
                          variant="soft"
                          color="red"
                          @click="openModalDelete(po.id)"
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

const router = useRouter();
const toast = useToast();
const listPo = ref();
const stateLoad = ref(true);
const pageNumber = ref(1);

const state = reactive({
  isOpenDelete: false,
  isOpenForm: false,
  idItems: "",
});

const statusType = ["created", "Done"];

function formatRupiah(value) {
  if (!value) return "Rp. 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function openModalDelete(id) {
  state.idItems = id;
  state.isOpenDelete = true;
}

function openDetailForm() {
  router.push(`/po/detail/`);
}

async function confirmDelete() {
  await usePostData(`/po/delete/${state.idItems}`);
  state.isOpenDelete = false;
  stateLoad.value = true;
  await useGetData("/po").then((res) => {
    listPo.value = res.data;
  });
  pageNumber.value = 1;
  stateLoad.value = false;
  toast.add({
    icon: "i-heroicons-check-circle",
    title: "PO successfully deleted",
    color: "green",
    timeout: 3000,
  });
}

const generatePDF = async (id) => {
  try {
    const response = await usePostData(`/po/${id}`);

    if (!response._data || !response._data.data) {
      throw new Error("Failed to fetch data from backend");
    }

    const backendData = response._data.data;
    const purchaseRequisitionData = {
      id: backendData.id,
      pr_reference: backendData.requisition.pr_no,
      pr_no: backendData.pr_no,
      delivery_date: backendData.delivery_date,
      remarks: backendData.remarks,
      req_date: backendData.req_date,
      department: backendData.requisition.department.name,
      items: backendData.items,
      username: backendData.requisition.user.name,
      total_price: backendData.total_price,
      vendor_name: backendData.vendor.vendor_name,
      phone: backendData.vendor.phone,
      email: backendData.vendor.email,
      address: backendData.vendor.address,
      contact_person: backendData.vendor.contact_person,
      status_po: statusType[backendData.status ?? 0],
    };

    const { PurchaseOrderPDF } = await import("~/utils/pdfPo.js");
    const pdfGenerator = new PurchaseOrderPDF();

    const doc = pdfGenerator.generatePDF(purchaseRequisitionData);

    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:]/g, "-");

    pdfGenerator.preview(`purchase-requisition-${timestamp}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};

onMounted(async () => {
  const activePage = useActivePage();
  activePage.page = "Purchase Order";
  activePage.child = "";
  activePage.create = true;
  activePage.submit = false;

  await useGetData("/po").then((res) => {
    listPo.value = res.data;
  });
  stateLoad.value = false;
});
</script>
<style>
@import "datatables.net-dt";
@import "datatables.net-responsive-dt";
@import url("~/assets/css/table.css");
</style>
