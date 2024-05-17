import api, { MOCKED } from "~/services/api.service";
import { getResponse } from "~/services/mocks";

class ShiftsService {
  getShifts() {
    if (MOCKED) return getResponse("getShifts", "shifts");
    return api().get("/settings/shifts");
  }
}

export default new ShiftsService();
