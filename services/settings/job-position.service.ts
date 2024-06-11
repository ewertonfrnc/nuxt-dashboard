import { getResponse } from "../mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  JobRole,
  QueryJobPositions,
} from "~/interfaces/settings/job-position.interface";

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

  saveJobPositions(role: JobRole) {
    if (MOCKED) return getResponse("saveJobPositions", "jobs");
    return api().post("/settings/job-positions", role);
  }

  deleteJobPosition(role: JobRole) {
    if (MOCKED) return getResponse("deleteJobPosition", "jobs");
    return api().post("/settings/job-positions", role);
  }
}

export default new CompanyService();
