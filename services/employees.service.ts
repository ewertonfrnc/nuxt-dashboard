import api from "~/services/api.service";
import {
  ActiveEmployeeQueryParams,
  InactiveEmployeeQueryParams,
} from "~/interfaces/employees/employees.interface";

class EmployeesService {
  fetchActiveEmployees(params: ActiveEmployeeQueryParams) {
    const { page, name, role, department, workType, status } = params;

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
}

export default new EmployeesService();
