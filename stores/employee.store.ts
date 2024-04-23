import { employeeService } from "~/services";
import {
  Employee,
  EmployeeClocks,
  EmployeeQueryParams,
} from "~/interfaces/employee/employee.interface";

export const useEmployeeStore = defineStore("employee", {
  persist: true,
  state() {
    return {
      employee: {} as Employee,
      clocks: [] as EmployeeClocks[],
      total: 0,
    };
  },
  actions: {
    async getEmployeeData(employeeId: string) {
      try {
        const {
          data: { employee },
        } = await employeeService.getEmployeeData(employeeId);

        this.employee = employee;
      } catch (error) {
        return error as Error;
      }
    },
    async getRegisteredClocks(
      employeeId: string,
      queryParams: EmployeeQueryParams,
    ) {
      try {
        const {
          data: { clocks, total },
        } = await employeeService.getRegisteredClocks(employeeId, queryParams);

        this.clocks = clocks;
        this.total = total;
        return { clocks, total };
      } catch (error) {
        return error as Error;
      }
    },
  },
});
