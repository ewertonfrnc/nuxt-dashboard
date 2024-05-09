import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  AdjustQueryParams,
  Employee,
  EmployeeAdjusts,
  EmployeeClocks,
  EmployeeQueryParams,
  EmployeePersonalData,
  EmployeeWorkInfo,
  EmployeeSchoolInfo,
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
    if (MOCKED) return getResponse("getEmployeeData", "employee");
    return api().get<EmployeeResponse>(`/employee/${employeeId}`);
  }

  updateEmployeeData(
    employeeId: string,
    updatedEmployeeData: EmployeePersonalData,
  ) {
    if (MOCKED) return getResponse("updateEmployeeData", "employee");
    return api().put(`/employee/${employeeId}`, updatedEmployeeData);
  }

  updateEmployeeWorkInfo(
    employeeId: string,
    updatedEmployeeData: EmployeeWorkInfo,
  ) {
    if (MOCKED) return getResponse("updateEmployeeWorkInfo", "employee");
    return api().put(`/employee/${employeeId}`, updatedEmployeeData);
  }

  updateEmployeeSchool(
    employeeId: string,
    updatedEmployeeData: EmployeeSchoolInfo,
  ) {
    if (MOCKED) return getResponse("updateEmployeeSchool", "employee");
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

    if (MOCKED) return getResponse("getRegisteredClocks", "employee");
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
    if (MOCKED) return getResponse("updateDayClock", "employee");
    return api().put(`/employee/clocks/${employeeId}`, clock);
  }

  getDatesToAdjust(employeeId: string, queryParams: AdjustQueryParams) {
    const { page, limit, dateToAdjust, requestDate, status } = queryParams;

    if (MOCKED) return getResponse("getDatesToAdjust", "employee");
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

  searchEmployeeAddres(cep: string) {
    if (MOCKED) return getResponse("searchEmployeeAddres", "employee");
    return api().get(`/employee/address/${cep}`);
  }
}

export default new EmployeeService();
