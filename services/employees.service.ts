import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  ActiveEmployeeQueryParams,
  Employees,
  InactiveEmployeeQueryParams,
} from "~/interfaces/employees/employees.interface";

class EmployeesService {
  fetchActiveEmployees(params: ActiveEmployeeQueryParams) {
    const { page, name, role, department, workType, status } = params;

    if (MOCKED) return getResponse("fetchActiveEmployees", "employees");

    return api().get("/employees/active-employees", {
      params: {
        page,
        limit: 10,
        name: name?.value || "",
        role: role?.value || "",
        department: department?.value || "",
        workType: workType?.value || "",
        status: status?.value || "",
      },
    });
  }

  fetchInactiveEmployees(params: InactiveEmployeeQueryParams) {
    const { page, name, hireDate, workType, dismissalDate } = params;

    if (MOCKED) return getResponse("fetchInactiveEmployees", "employees");

    return api().get("employees/inactive-employees", {
      params: {
        page,
        limit: 10,
        name: name?.value || "",
        hireDate: hireDate?.value || "",
        workType: workType?.value || "",
        dismissalDate: dismissalDate?.value || "",
      },
    });
  }

  reactivateEmployee(employee: Employees) {
    if (MOCKED) return getResponse("reactivateEmployee", "employees");
    return api().post(`/employees/reactivate-employee`, employee);
  }
}

export default new EmployeesService();
