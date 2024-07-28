import employeesService from "~/services/employees.service";
import {
  ActiveEmployeeQueryParams,
  Employees,
  InactiveEmployeeQueryParams,
} from "~/interfaces/employees/employees.interface";

type EmployeesState = {
  total: number;
  employees: Employees[];
};

export const useEmployeesStore = defineStore("employees", {
  state(): EmployeesState {
    return {
      total: 0,
      employees: [],
    };
  },
  actions: {
    async getActiveEmployees(params: ActiveEmployeeQueryParams) {
      try {
        const { employees, total } =
          await employeesService.fetchActiveEmployees(params);
        this.employees = employees;
        this.total = total;
      } catch (err) {
        return err as Error;
      }
    },
    async getInactiveEmployees(params: InactiveEmployeeQueryParams) {
      try {
        const { employees, total } =
          await employeesService.fetchInactiveEmployees(params);
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
