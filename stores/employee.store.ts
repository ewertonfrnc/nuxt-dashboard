import { Employee } from "~/interfaces/employee/employee.interface";
import { employeeService } from "~/services";

export const useEmployeeStore = defineStore("employee", {
  persist: true,
  state() {
    return {
      employee: {} as Employee,
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
  },
});
