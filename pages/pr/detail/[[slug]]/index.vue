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
            <div class="grid grid-cols-4 gap-4 mb-5 mt-1 border-b-2 pb-2">
              <BaseInputAlternate
                name="estimated_price"
                type="number"
                label="Total Estimated Cost"
                icon="material-symbols:add-notes-rounded"
                v-model="dataForm.estimated_price"
              />
              <BaseInputAlternateSelect
                name="department"
                label="Department"
                placeholder="Department"
                :listdata="departmentList"
                v-model="dataForm.department"
              />
              <BaseInputAlternateDate
                name="req_date"
                label="Request Date"
                placeholder="Remarks"
                icon="material-symbols:add-notes-rounded"
                v-model="dataForm.req_date"
              />
              <BaseInputAlternate
                name="remarks"
                type="text"
                label="Remarks"
                placeholder="Remarks"
                icon="material-symbols:add-notes-rounded"
                v-model="dataForm.remarks"
              />
            </div>
          </Form>
          <div v-show="!!route.params.slug" class="place-self-center w-fit">
            <ul class="relative flex flex-col md:flex-row gap-2 mb-5 mt-10">
              <li
                class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
              >
                <div
                  class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle"
                >
                  <span
                    class="size-7 flex justify-center items-center shrink-0 bg-[#0061A6] font-medium text-gray-100 rounded-full"
                  >
                    1
                  </span>
                  <div
                    class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-[#0061A6] group-last:hidden"
                  ></div>
                </div>
                <div class="grow md:grow-0 md:mt-3 pb-5">
                  <span class="block text-sm font-medium text-gray-800">
                    Step
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    Success create Purchase Requisitions
                  </p>
                </div>
              </li>
              <li
                class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
              >
                <div
                  class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle"
                >
                  <span
                    class="size-7 flex justify-center items-center shrink-0 font-medium rounded-full"
                    :class="
                      state.statusPr >= '1'
                        ? 'bg-[#0061A6] text-gray-100 '
                        : 'bg-gray-100 text-gray-600 '
                    "
                  >
                    2
                  </span>
                  <div
                    class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden"
                    :class="
                      state.statusPr >= '1' ? 'bg-[#0061A6] ' : 'bg-gray-300 '
                    "
                  ></div>
                </div>
                <div class="grow md:grow-0 md:mt-3 pb-5">
                  <span class="block text-sm font-medium text-gray-800">
                    Step
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    Success sent Purchase Requisitions
                  </p>
                </div>
              </li>
              <li
                class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
              >
                <div
                  class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle"
                >
                  <span
                    class="size-7 flex justify-center items-center shrink-0 font-medium rounded-full"
                    :class="
                      state.statusApprove >= '1' && state.statusApprove != '3'
                        ? 'bg-[#0061A6] text-gray-100 '
                        : state.statusApprove == '3'
                          ? 'bg-[#a60000] text-gray-100 '
                          : 'bg-gray-100 text-gray-600 '
                    "
                  >
                    3
                  </span>
                  <div
                    class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden"
                    :class="
                      state.statusApprove >= '1' && state.statusApprove != '3'
                        ? 'bg-[#0061A6] '
                        : 'bg-gray-300 '
                    "
                  ></div>
                </div>
                <div class="grow md:grow-0 md:mt-3 pb-5">
                  <span class="block text-sm font-medium text-gray-800">
                    Step
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    Purchase Requisitions Approved by Manager.
                  </p>
                </div>
              </li>
              <li
                class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
              >
                <div
                  class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle"
                >
                  <span
                    class="size-7 flex justify-center items-center shrink-0 font-medium rounded-full"
                    :class="
                      state.statusApprove == '2' &&
                      state.statusApprove != '3' &&
                      state.statusApprove != '4'
                        ? 'bg-[#0061A6] text-gray-100 '
                        : state.statusApprove == '4'
                          ? 'bg-[#a60000] text-gray-100 '
                          : 'bg-gray-100 text-gray-600 '
                    "
                  >
                    4
                  </span>
                  <div
                    class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden"
                    :class="
                      state.statusApprove == '2' &&
                      state.statusApprove != '3' &&
                      state.statusApprove != '4'
                        ? 'bg-[#0061A6] '
                        : 'bg-gray-300 '
                    "
                  ></div>
                </div>
                <div class="grow md:grow-0 md:mt-3 pb-5">
                  <span class="block text-sm font-medium text-gray-800">
                    Step
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    Purchase Requisitions Approved by Head of Division
                  </p>
                </div>
              </li>
              <li
                class="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block"
              >
                <div
                  class="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle"
                >
                  <span
                    class="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full"
                  >
                    5
                  </span>
                  <div
                    class="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-gray-200 group-last:hidden"
                  ></div>
                </div>
                <div class="grow md:grow-0 md:mt-3 pb-5">
                  <span class="block text-sm font-medium text-gray-800">
                    Step
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">
                    Purchase Order Created
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex">
            <p class="mt-2 mb-1 text-[17px] font-[600] text-slate-800">
              Items of Purchase Requisitions
            </p>
            <div
              v-show="state.statusPr == '0' || !!!route.params.slug"
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
                  <th>Estimated Coast</th>
                  <th v-if="state.statusPr == 'pending'">Action</th>
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
                    {{ formatRupiah(items.estimated_price) }}
                  </td>
                  <td
                    v-if="state.statusPr == 'pending'"
                    class="text-sm font-normal leading-normal"
                  >
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
          <div class="flex">
            <p class="mt-10 mb-1 text-[17px] font-[600] text-slate-800">
              History Approval
            </p>
          </div>
          <DataTable
            class="table-flush content-table table display text-slate-500"
          >
            <thead class="thead-light">
              <tr>
                <th>No</th>
                <th>User Approves</th>
                <th>DateTime</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(items, index) in listItemsHistory"
                :key="items.id + index"
              >
                <td class="text-sm font-normal leading-normal">
                  {{ index + 1 }}
                </td>
                <td class="text-sm font-normal leading-normal">
                  {{ items.approver.name }}
                </td>
                <td class="text-sm font-normal leading-normal">
                  {{ items.approval_date }}
                </td>
                <td
                  class="text-sm font-normal leading-normal"
                  :class="
                    items.status == 'approved' ? 'bg-[#78C1A3]' : 'bg-[#F38989]'
                  "
                >
                  {{ items.status.toUpperCase() }}
                </td>
              </tr>
            </tbody>
          </DataTable>
        </div>
      </div>
    </div>
    <BaseModalsForm
      :open-modal="state.isOpenForm"
      title-modal="Form Purchase Requisitions Items"
      desc-modal="This form is used to add and update items PR."
      @close="state.isOpenForm = false"
    >
      <template #body>
        <div>
          <PRForm
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
  statusPr: "",
  statusApprove: "",
});
const departmentList = ref([]);
const dataForm = reactive({
  estimated_price: 0,
  remarks: "",
  req_date: "",
  department: [],
});
const stateLoad = ref(true);
const stateLoadTable = ref(false);
let listItems = ref([]);
let listItemsHistory = ref([]);

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
    totalCost += item.estimated_price;
  });
  dataForm.estimated_price = totalCost;
}

const schema = yup.object({
  estimated_price: yup.number().required(),
  remarks: yup.string().required().min(3).max(32),
  req_date: yup.string().required(),
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
  values["department"] = values.department.value ?? 0;
  if (!!!state.idItems) {
    await usePostData(`/pr_req/create`, values).then((res) => {
      if (res.status == 201) {
        toast.add({
          icon: "i-heroicons-check-circle",
          title: "PR successfully created",
          color: "green",
          timeout: 3000,
        });
        return navigateTo("/pr");
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
    await usePostData(`/pr_req/update/${state.idItems}`, values).then((res) => {
      if (res.status == 200) {
        toast.add({
          icon: "i-heroicons-check-circle",
          title: "PR successfully updated",
          color: "green",
          timeout: 3000,
        });
        return navigateTo("/pr");
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
  const activePage = useActivePage();
  activePage.page = "Purchase Requisitions";
  activePage.child = !!route.params.slug ? " > Detail > Update" : " > Detail";
  activePage.create = false;
  activePage.submit = true;

  await useGetData("/departments/get_select").then((res) => {
    departmentList.value = res.data;
  });

  if (!!route.params.slug) {
    await usePostData(`/pr_req/${route.params.slug}`).then((res) => {
      (state.idItems = res._data.data.id),
        (dataForm.estimated_price = res._data.data.total_estimated_price),
        (dataForm.remarks = res._data.data.remarks),
        (dataForm.req_date = res._data.data.req_date),
        (dataForm.department = {
          label: res._data.data.department.name,
          value: res._data.data.department.id,
        }),
        (listItems.value = res._data.data.items);
      state.statusPr = res._data.data.status;
      state.statusApprove = res._data.data.status_approval;
      if (res._data.data.status == "0") {
        activePage.submit = true;
      } else {
        activePage.submit = false;
      }
    });
    await usePostData(`/approval/history/${route.params.slug}`).then((res) => {
      listItemsHistory.value = res._data.data;
    });
  }
  stateLoad.value = false;
});
</script>
