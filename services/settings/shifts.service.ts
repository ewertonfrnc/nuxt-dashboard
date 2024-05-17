import api, { MOCKED } from "~/services/api.service";
import { getResponse } from "~/services/mocks";
import { WeeklySchedule } from "~/interfaces/settings/shifts.interface";

class ShiftsService {
  getShifts() {
    if (MOCKED) return getResponse("getShifts", "shifts");
    return api().get("/settings/shifts");
  }

  saveShifts(shifts: WeeklySchedule) {
    if (MOCKED) return getResponse("saveShifts", "shifts");
    return api().post("/settings/shifts", shifts);
  }
}

export default new ShiftsService();
