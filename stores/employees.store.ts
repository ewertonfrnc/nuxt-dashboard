import employeesService from "~/services/employees.service";
import {
  Employees,
  QueryParams,
} from "~/interfaces/employees/employees.interface";

type EmployeesState = {
  total: number;
  employees: Employees[];
};

export const useEmployeesStore = defineStore("employees", {
  persist: true,
  state(): EmployeesState {
    return {
      total: 0,
      employees: [],
    };
  },
  actions: {
    async getActiveEmployees(params: QueryParams) {
      try {
        const {
          data: { employees, total },
        } = await employeesService.fetchActiveEmployees(params);
        this.employees = employees;
        this.total = total;
      } catch (err) {
        return err as Error;
      }
    },
  },
});
