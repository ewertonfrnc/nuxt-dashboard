import api from "~/services/api.service";
import {
  QueryParams,
  AllClocksParams,
  Request,
} from "~/interfaces/time-sheet/time-sheet.interface";
import { WorkLog } from "~/interfaces/employee/employee.interface";

class TimeSheetService {
  fetchPendingAdjustments(params: QueryParams) {
    const { page, name, currentBalance, totalRequests } = params;

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
    return api().get(`/time-sheet/pending/${userId}`);
  }

  updatePendingAdjustments(userId: number, payload: WorkLog[]) {
    userId = 1000;
    return api().put(`/time-sheet/pending/${userId}`, payload);
  }

  fetchAllClocks(params: AllClocksParams) {
    const { page, limit, name, hour, department, tag, date } = params;

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
