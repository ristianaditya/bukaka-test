<template>
  <div>
    <BaseHeaderNavigation @submit="handleSubmit()" />
    <UContainer
      v-if="stateLoad"
      class="flex h-[40vh] items-center justify-center text-center"
    >
      <span class="loading loading-spinner loading-lg text-[#49479F]"></span>
    </UContainer>
    <div v-else>
      <div class="w-full max-w-full">
        <div
          class="shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 bg-white bg-clip-border"
        >
          <Form
            :initial-values="dataForm"
            :validation-schema="schema"
            @submit="onSubmit"
          >
            <button v-show="false" ref="submitForm" type="submit">
              Save Changes
            </button>
            <div class="grid grid-cols-4 gap-x-7 gap-y-2 mb-10 mt-5 w-[60vw]">
              <BaseInputAlternateSelect
                name="pr_no"
                label="Purchase Requisition No"
                placeholder="PR No"
                :listdata="prList"
                v-model="dataForm.pr_no"
              />
              <BaseInputAlternateSelect
                name="vendor"
                label="Vendor"
                placeholder="Vendor"
                :listdata="vendorList"
                v-model="dataForm.vendor"
              />
              <BaseInputAlternateDate
                name="po_date"
                label="PO Date"
                placeholder="PO Date"
                icon="material-symbols:add-notes-rounded"
                v-model="dataForm.po_date"
              />
              <BaseInputAlternateDate
                name="delivery_date"
                label="Delivery Date"
                placeholder="Delivery Date"
                icon="material-symbols:add-notes-rounded"
                v-model="dataForm.delivery_date"
              />
              <BaseInputAlternate
                name="total_price"
                type="number"
                label="Total Price"
                icon="i-heroicons-currency-dollar"
                v-model="dataForm.total_price"
              />
              <BaseInputAlternateSelect
                name="status"
                label="PO Status"
                placeholder="Status"
                :listdata="statusList"
                v-model="dataForm.status"
              />
            </div>
          </Form>
          <div class="flex">
            <p class="mt-2 mb-1 text-[17px] font-[600] text-slate-800">
              Items of Purchase Order
            </p>
            <div
              class="btn btn-circle btn-sm mt-1 ml-3 text-[#2961A6] border-white bg-[#F0F2FD] hover:bg-[#BBC5FC] hover:border-white"
              @click="openModalForm()"
            >
              <Icon name="material-symbols:add" class="text-2xl" />
            </div>
          </div>
          <UContainer
            v-if="stateLoadTable"
            class="flex h-[40vh] items-center justify-center text-center"
          >
            <span
              class="loading loading-spinner loading-lg text-[#49479F]"
            ></span>
          </UContainer>
          <div v-else class="table-responsive">
            <DataTable
              class="table-flush content-table table display text-slate-500"
            >
              <thead class="thead-light">
                <tr>
                  <th>No</th>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(items, index) in listItems"
                  :key="items.item_name + index"
                >
                  <td class="text-sm font-normal leading-normal">
                    {{ index + 1 }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ items.item_name }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ items.description }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ items.quantity }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    {{ formatRupiah(items.price) }}
                  </td>
                  <td class="text-sm font-normal leading-normal">
                    <UTooltip text="Delete" :popper="{ offsetDistance: 16 }">
                      <UButton
                        variant="soft"
                        color="red"
                        @click="confirmDelete(index)"
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
                  </td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <BaseModalsForm
      :open-modal="state.isOpenForm"
      title-modal="Form Purchase Orders Items"
      desc-modal="This form is used to add and update items PO."
      @close="state.isOpenForm = false"
    >
      <template #body>
        <div>
          <POForm
            :id-modal="state.idItems"
            @close="state.isOpenForm = false"
            @confirm="confirmSave"
          />
        </div>
      </template>
    </BaseModalsForm>

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
          <UButton variant="solid" color="red" @click="deleteItem">
            Delete
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
import { Form } from "vee-validate";
import * as yup from "yup";

DataTable.use(DataTablesCore);

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const toast = useToast();
const submitForm = ref();
const state = reactive({
  isOpenDelete: false,
  isOpenForm: false,
  idItems: "",
  deleteIndex: null,
});
const vendorList = ref([]);
const prList = ref([]);
const dataForm = reactive({
  pr_no: [],
  vendor: [],
  po_date: "",
  delivery_date: "",
  total_price: 0,
  status: [],
});
const statusList = [
  {
    label: "Created",
    value: "0",
  },
  {
    label: "Done",
    value: "1",
  },
];
const stateLoad = ref(true);
const stateLoadTable = ref(false);
let listItems = ref([]);

function openModalForm() {
  state.isOpenForm = true;
}

function confirmDelete(index) {
  state.deleteIndex = index;
  state.isOpenDelete = true;
}

async function deleteItem() {
  stateLoadTable.value = true;
  if (state.deleteIndex !== null) {
    await listItems.value.splice(state.deleteIndex, 1);

    recalculateTotalCost();

    state.isOpenDelete = false;
    state.deleteIndex = null;

    toast.add({
      icon: "i-heroicons-check-circle",
      title: "Item successfully deleted",
      color: "green",
      timeout: 3000,
    });
  }
  stateLoadTable.value = false;
}

function formatRupiah(value) {
  if (!value) return "Rp. 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function recalculateTotalCost() {
  let totalCost = 0;
  listItems.value.forEach((item) => {
    totalCost += item.price;
  });
  dataForm.total_price = totalCost;
}

const schema = yup.object({
  total_price: yup.number().required(),
  po_date: yup.string().required(),
  delivery_date: yup.string().required(),
});

async function confirmSave(res) {
  stateLoadTable.value = true;
  state.isOpenForm = false;

  await listItems.value.push(res);
  recalculateTotalCost();
  stateLoadTable.value = false;
}

const handleSubmit = async () => {
  submitForm.value?.click();
};

async function onSubmit(values) {
  values["items"] = listItems.value;
  values["status"] = values.status.value ?? 0;
  values["pr_id"] = values.pr_no.value ?? 0;
  values["vendor_id"] = values.vendor.value ?? 0;
  if (!!!state.idItems) {
    await usePostData(`/po/create`, values).then((res) => {
      if (res.status == 201) {
        toast.add({
          icon: "i-heroicons-check-circle",
          title: "PR successfully created",
          color: "green",
          timeout: 3000,
        });
        return navigateTo("/po");
      }
      if (res.status == 422) {
        const validator = res._data?.name || res?._data.no_phone;
        toast.add({
          icon: "i-heroicons-exclamation-triangle",
          title: validator[0],
          color: "orange",
          timeout: 3000,
        });
      }
    });
  } else {
    await usePostData(`/po/update/${state.idItems}`, values).then((res) => {
      if (res.status == 200) {
        toast.add({
          icon: "i-heroicons-check-circle",
          title: "PR successfully updated",
          color: "green",
          timeout: 3000,
        });
        return navigateTo("/po");
      }
      if (res.status == 422) {
        const validator = res._data?.name || res?._data.no_phone;
        toast.add({
          icon: "i-heroicons-exclamation-triangle",
          title: validator[0],
          color: "orange",
          timeout: 3000,
        });
      }
    });
  }
}

onMounted(async () => {
  const statusType = ["created", "Done"];
  const activePage = useActivePage();
  activePage.page = "Purchase Order";
  activePage.child = !!route.params.slug ? " > Detail > Update" : " > Detail";
  activePage.create = false;
  activePage.submit = true;

  await useGetData("/vendors/get_select").then((res) => {
    vendorList.value = res.data;
  });
  await useGetData("/pr_req/get_select").then((res) => {
    prList.value = res.data;
  });

  if (!!route.params.slug) {
    await usePostData(`/po/${route.params.slug}`).then((res) => {
      (state.idItems = res._data.data.id),
        (dataForm.total_price = res._data.data.total_price),
        (dataForm.po_date = res._data.data.po_date),
        (dataForm.delivery_date = res._data.data.delivery_date),
        (dataForm.vendor = {
          label: res._data.data.vendor.vendor_name,
          value: res._data.data.vendor.id,
        }),
        (dataForm.status = {
          label: statusType[res._data.data.status],
          value: res._data.data.status,
        }),
        (dataForm.pr_no = {
          label: res._data.data.requisition.pr_no,
          value: res._data.data.requisition.id,
        }),
        (listItems.value = res._data.data.items);
      state.statusApprove = res._data.data.status_approval;
    });
  }
  stateLoad.value = false;
});
</script>
