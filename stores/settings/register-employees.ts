import { defineStore } from "pinia";

type RegisterEmployeesState = {
  csvData: string[];
};

export const useRegisterEmployeesStore = defineStore("register-employees", {
  persist: true,
  state(): RegisterEmployeesState {
    return {
      csvData: [],
    };
  },
  actions: {
    updateCsvData(csvData) {
      this.csvData = csvData;
    },
  },
});
