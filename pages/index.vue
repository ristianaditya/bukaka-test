<template>
  <BaseHeaderNavigation @open="createModal()" />
  <div></div>
</template>

<script setup>
import { useActivePage } from "@/store/index";
const idUser = ref();
const stateLoad = ref(true);

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  const activePage = useActivePage();
  activePage.page = "Dashboard";
  activePage.child = "";
  activePage.create = false;

  await useGetSession("/user/getSession").then((res) => {
    idUser.value = res.data.id;
  });
  stateLoad.value = false;
});
</script>
