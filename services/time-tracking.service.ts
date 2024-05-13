import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import { QueryOpenClockClosings } from "~/interfaces/time-tracking/time-tracking.interface";

class TimeTrackingService {
  getOpenClockClosing(params: QueryOpenClockClosings) {
    const { page, limit, id, period, employeesCount, status } = params;

    if (MOCKED) return getResponse("getOpenClockClosing", "timeTracking");

    return api().get(`/time-tracking/pending`, {
      params: {
        page,
        limit,
        id: id?.value || "",
        period: period?.value || "",
        employeesCount: employeesCount?.value || "",
        status: status?.value || "",
      },
    });
  }
}

export default new TimeTrackingService();
