import api from "~/services/api.service";
import { QueryParams } from "~/interfaces/time-sheet/time-sheet.interface";

class TimeSheetService {
  fetchPendingAdjustments(params: QueryParams) {
    const { name, currentBalance, totalRequests } = params;

    return api().get(`/api/time-sheet/pending`, {
      params: {
        page: 1,
        limit: 10,
        name: name?.value || "",
        currentBalance: currentBalance?.value || "",
        totalRequests: totalRequests?.value || "",
      },
    });
  }
}
export default new TimeSheetService();
