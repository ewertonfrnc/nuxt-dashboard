import { getResponse } from "../mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  Department,
  QueryDepartments,
} from "~/interfaces/settings/departments.interface";

class DepartmentsService {
  getDepartments(queries: QueryDepartments) {
    const { page, limit, department, employeesCount } = queries;

    if (MOCKED) return getResponse("getDepartments", "departments");

    return api().get("/settings/departments", {
      params: {
        page,
        limit,
        department: department?.value || "",
        employeesCount: employeesCount?.value || "",
      },
    });
  }

  saveDepartments(department: Department) {
    if (MOCKED) return getResponse("saveDepartments", "departments");
    return api().post("/settings/departments", department);
  }

  deleteDepartments(department: Department) {
    if (MOCKED) return getResponse("deleteDepartments", "departments");
    return api().post("/settings/departments", department);
  }
}

export default new DepartmentsService();
