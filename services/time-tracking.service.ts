import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";
import {
  ClockClosing,
  QueryClockClosingDetails,
  QueryOpenClockClosings,
  TimeTrackingPeriod,
} from "~/interfaces/time-tracking/time-tracking.interface";

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

  getClockClosingDetails(clockId: string, params: QueryClockClosingDetails) {
    const { page, limit, name, role, status } = params;

    if (MOCKED) return getResponse("getClockClosingDetails", "timeTracking");

    return api().get(`/time-tracking/${clockId}`, {
      params: {
        page,
        limit,
        name: name?.value || "",
        role: role?.value || "",
        status: status?.value || "",
      },
    });
  }

  requestSignature(clock: ClockClosing) {
    if (MOCKED) return getResponse("requestSignature", "timeTracking");
    return api().post(`/time-tracking/signa${clock.id}`, clock);
  }

  requestSignatureBatch(clockId: string, clocks: ClockClosing[]) {
    if (MOCKED) return getResponse("requestSignatureBatch", "timeTracking");
    return api().post(`/time-tracking/signa${clockId}`, clocks);
  }

  generateDocumentAndSend(period: TimeTrackingPeriod) {
    if (MOCKED) return getResponse("generateDocumentAndSend", "timeTracking");
    return api().post("/time-tracking", period);
  }
}

export default new TimeTrackingService();
