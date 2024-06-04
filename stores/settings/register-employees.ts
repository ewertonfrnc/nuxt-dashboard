import { defineStore } from "pinia";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import { registerService } from "~/services";

type RegisterEmployeesState = {
  csvData: RegisterEmployee[];
  total: number;
};

export const useRegisterEmployeesStore = defineStore("register-employees", {
  persist: true,
  state(): RegisterEmployeesState {
    return {
      csvData: [],
      total: 0,
    };
  },
  actions: {
    async fetchWorkOptions() {
      try {
        const { options } = await registerService.getWorkOptions();
        return options;
      } catch (error) {
        return error as Error;
      }
    },
    updateCsvData(csvData: RegisterEmployee[]) {
      this.csvData = csvData;
      this.total = this.csvData.length;
    },
  },
});
