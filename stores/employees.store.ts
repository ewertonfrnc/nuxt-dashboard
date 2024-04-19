import employeesService from "~/services/employees.service";
import { QueryParams } from "~/interfaces/employees/employees.interface";

type EmployeesState = {};

export const useEmployeesStore = defineStore("employees", {
  persist: true,
  state(): EmployeesState {
    return {};
  },
  actions: {
    async getActiveEmployees(params: QueryParams) {
      try {
        const {
          data: { employees, total },
        } = await employeesService.fetchActiveEmployees(params);
        return { employees, total };
      } catch (err) {
        return err as Error;
      }
    },
  },
});
