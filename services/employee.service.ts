import api from "~/services/api.service";
import {
  AdjustClocks,
  Employee,
  EmployeeClocks,
  EmployeeQueryParams,
} from "~/interfaces/employee/employee.interface";

type EmployeeResponse = {
  employee: Employee;
};

type RegisteredClocks = {
  clocks: EmployeeClocks[];
  total: number;
};

class EmployeeService {
  getEmployeeData(employeeId: string) {
    return api().get<EmployeeResponse>(`/employee/${employeeId}`);
  }

  getRegisteredClocks(employeeId: string, queryParams: EmployeeQueryParams) {
    const {
      page,
      limit,
      date,
      currentBalance,
      firstCheckIn,
      lastCheckOut,
      dayStatus,
    } = queryParams;

    return api().get<RegisteredClocks>(`/employee/clocks/${employeeId}`, {
      params: {
        page,
        limit,
        date: date?.value || "",
        currentBalance: currentBalance?.value || "",
        firstCheckIn: firstCheckIn?.value || "",
        lastCheckOut: lastCheckOut?.value || "",
        dayStatus: dayStatus?.value || "",
      },
    });
  }

  updateDayClock(employeeId: number, clock: AdjustClocks) {
    return api().put(`/employee/clocks/${employeeId}`, clock);
  }
}

export default new EmployeeService();
