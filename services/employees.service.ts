import api from "~/services/api.service";
import { QueryParams } from "~/interfaces/employees/employees.interface";

class EmployeesService {
  fetchActiveEmployees(params: QueryParams) {
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
}

export default new EmployeesService();
