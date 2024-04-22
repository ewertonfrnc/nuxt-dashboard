import employeesService from "~/services/employees.service";
import {
  ActiveEmployeeQueryParams,
  Employees,
  InactiveEmployeeQueryParams,
} from "~/interfaces/employees/employees.interface";

type EmployeesState = {};

export const useEmployeesStore = defineStore("employees", {
  persist: true,
  state(): EmployeesState {
    return {};
  },
  actions: {
    async getActiveEmployees(params: ActiveEmployeeQueryParams) {
      try {
        const {
          data: { employees, total },
        } = await employeesService.fetchActiveEmployees(params);
        return { employees, total };
      } catch (err) {
        return err as Error;
      }
    },
    async getInactiveEmployees(params: InactiveEmployeeQueryParams) {
      try {
        const {
          data: { employees, total },
        } = await employeesService.fetchInactiveEmployees(params);
        return { employees, total };
      } catch (err) {
        return err as Error;
      }
    },
    async reactivateEmployee(employee: Employees) {
      try {
        await employeesService.reactivateEmployee(employee);
      } catch (err) {
        return err as Error;
      }
    },
  },
});
