import { defineStore } from "pinia";

export const useComplateRegis = defineStore("complate-regis", {
  state: () => {
    return { completion: true };
  },
});

export const useSessionData = defineStore("session-data", {
  state: () => {
    return {
      id: "",
      name: "",
      email: "",
      role: "user",
    };
  },
});

export const useActivePage = defineStore("active-page", {
  state: () => {
    return { page: "", child: "", create: true, formCreate: "", submit: false };
  },
});
