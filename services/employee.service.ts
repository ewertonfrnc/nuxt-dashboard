import api from "~/services/api.service";
import {
  AdjustQueryParams,
  Employee,
  EmployeeAdjusts,
  EmployeeClocks,
  EmployeeQueryParams,
  EmployeePersonalData,
} from "~/interfaces/employee/employee.interface";

type EmployeeResponse = {
  employee: Employee;
};

type RegisteredClocks = {
  clocks: EmployeeClocks[];
  total: number;
};

type AdjustClocks = {
  adjusts: EmployeeAdjusts[];
  total: number;
};

class EmployeeService {
  getEmployeeData(employeeId: string) {
    return api().get<EmployeeResponse>(`/employee/${employeeId}`);
  }

  updateEmployeeData(
    employeeId: string,
    updatedEmployeeData: EmployeePersonalData,
  ) {
    return api().put(`/employee/${employeeId}`, updatedEmployeeData);
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

  getDatesToAdjust(employeeId: string, queryParams: AdjustQueryParams) {
    const { page, limit, dateToAdjust, requestDate, status } = queryParams;

    return api().get<AdjustClocks>(`/employee/adjusts/${employeeId}`, {
      params: {
        page,
        limit,
        dateToAdjust: dateToAdjust?.value || "",
        requestDate: requestDate?.value || "",
        status: status?.value || "",
      },
    });
  }
}

export default new EmployeeService();
