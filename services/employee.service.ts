import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  AdjustQueryParams,
  Employee,
  EmployeeAdjusts,
  EmployeeClocks,
  EmployeeQueryParams,
  EmployeePersonalData,
  EmployeeContact,
  EmployeeWorkInfo,
  EmployeeSchoolInfo,
  EmployeeDocuments,
  EmployeeDeactivationDetails,
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

  sendRecoverPasswordEmail(employeeId: string) {
    if (MOCKED) return getResponse("sendRecoverPasswordEmail", "employee");
    return api().get(`/employee/recover-email/${employeeId}`);
  }

  deactivateEmployee(employeeId: string, details: EmployeeDeactivationDetails) {
    if (MOCKED) return getResponse("deactivateEmployee", "employee");
    return api().post(`/employee/deactivate/${employeeId}`, details);
  }
}

export default new EmployeeService();
