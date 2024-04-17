import api from "~/services/api.service";

class TimeSheetService {
  fetchPendingAdjustments() {
    return api().get("/api/time-sheet/pending");
  }
}

export default new TimeSheetService();
