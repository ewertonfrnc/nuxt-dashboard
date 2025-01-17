import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  QueryParams,
  AllClocksParams,
  Request,
} from "~/interfaces/time-sheet/time-sheet.interface";
import { WorkLog } from "~/interfaces/employee/employee.interface";

class TimeSheetService {
  fetchPendingAdjustments(params: QueryParams) {
    const { page, name, currentBalance, totalRequests } = params;

    if (MOCKED) return getResponse("fetchPendingAdjustments", "timeSheet");

    return api().get(`/time-sheet/pending`, {
      params: {
        page,
        limit: 10,
        name: name?.value || "",
        currentBalance: currentBalance?.value || "",
        totalRequests: totalRequests?.value || "",
      },
    });
  }

  fetchUserPendingAdjustments(userId: number) {
    if (MOCKED) return getResponse("fetchUserPendingAdjustments", "timeSheet");
    return api().get(`/time-sheet/pending/${userId}`);
  }

  updatePendingAdjustments(userId: number, payload: WorkLog[]) {
    userId = 1000;
    if (MOCKED) return getResponse("updatePendingAdjustments", "timeSheet");
    return api().put(`/time-sheet/pending/${userId}`, payload);
  }

  fetchAllClocks(params: AllClocksParams) {
    const { page, limit, name, hour, department, tag, date } = params;

    if (MOCKED) return getResponse("fetchAllClocks", "timeSheet");

    return api().get("time-sheet/clocks", {
      params: {
        page,
        limit,
        date: date || "",
        tag: tag?.value || "",
        name: name?.value || "",
        hour: hour?.value || "",
        department: department?.value || "",
      },
    });
  }
}
export default new TimeSheetService();
