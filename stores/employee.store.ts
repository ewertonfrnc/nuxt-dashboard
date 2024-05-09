import { employeeService } from "~/services";
import {
  AdjustClocks,
  AdjustQueryParams,
  Employee,
  EmployeeAdjusts,
  EmployeeClocks,
  EmployeePersonalData,
  EmployeeQueryParams,
  EmployeeWorkInfo,
} from "~/interfaces/employee/employee.interface";

type EmployeeStore = {
  employee: Employee;
  total: number;
  clocks: EmployeeClocks[];
  adjusts: EmployeeAdjusts[];
};

export const useEmployeeStore = defineStore("employee", {
  persist: true,
  state(): EmployeeStore {
    return {
      employee: {} as Employee,
      total: 0,
      clocks: [] as EmployeeClocks[],
      adjusts: [] as EmployeeAdjusts[],
    };
  },
  actions: {
    async getEmployeeData(employeeId: string) {
      try {
        const { employee } = await employeeService.getEmployeeData(employeeId);

        this.employee = employee;
      } catch (error) {
        return error as Error;
      }
    },
    async updateEmployeeData(
      employeeId: string,
      updatedEmployeeData: EmployeePersonalData,
    ) {
      try {
        const { employee } = await employeeService.updateEmployeeData(
          employeeId,
          updatedEmployeeData,
        );
        this.employee = employee;
      } catch (error) {
        return error as Error;
      }
    },
    async updateEmployeeWorkInfo(
      employeeId: string,
      updatedEmployeeData: EmployeeWorkInfo,
    ) {
      try {
        const { employee } = await employeeService.updateEmployeeWorkInfo(
          employeeId,
          updatedEmployeeData,
        );
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
        const { clocks, total } = await employeeService.getRegisteredClocks(
          employeeId,
          queryParams,
        );

        this.clocks = clocks;
        this.total = total;
        return { clocks, total };
      } catch (error) {
        return error as Error;
      }
    },
    async updateDayClock(employeeId: number, clock: AdjustClocks) {
      try {
        await employeeService.updateDayClock(employeeId, clock);
      } catch (error) {
        return error as Error;
      }
    },
    async getDatesToAdjust(employeeId: string, queryParams: AdjustQueryParams) {
      try {
        const { adjusts, total } = await employeeService.getDatesToAdjust(
          employeeId,
          queryParams,
        );

        this.adjusts = adjusts;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async searchEmployeeAddres(cep: string) {
      try {
        const { address } = await employeeService.searchEmployeeAddres(cep);
        return address;
      } catch (error) {
        return error as Error;
      }
    },
  },
});
