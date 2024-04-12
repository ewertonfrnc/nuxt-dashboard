import api from "~/services/api.service";
import {
  QueryParams,
  Request,
} from "~/interfaces/time-sheet/time-sheet.interface";

class TimeSheetService {
  fetchPendingAdjustments(params: QueryParams) {
    const { page, name, currentBalance, totalRequests } = params;

    return api().get(`/api/time-sheet/pending`, {
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
    return api().get(`/api/time-sheet/pending/${userId}`);
  }

  updatePendingAdjustments(userId: number, payload: Request[]) {
    return api().put(`/api/time-sheet/pending/${userId}`, payload);
  }
}
export default new TimeSheetService();
