import { getResponse } from "../mocks";
import api, { MOCKED } from "~/services/api.service";
import { QueryJobPositions } from "~/interfaces/settings/job-position.interface";

class CompanyService {
  getJobPositions(queries: QueryJobPositions) {
    const { page, limit, role, cbo, employeesCount } = queries;

    if (MOCKED) return getResponse("getJobPositions", "jobs");

    return api().get("/settings/job-positions", {
      params: {
        page,
        limit,
        role: role?.value || "",
        cbo: cbo?.value || "",
        employeesCount: employeesCount?.value || "",
      },
    });
  }

  saveJobPositions() {
    if (MOCKED) return getResponse("saveJobPositions", "jobs");
    return api().post("/settings/job-positions");
  }
}

export default new CompanyService();
