import { getResponse } from "../mocks";
import api, { MOCKED } from "../api.service";
import { clockValues } from "~/interfaces/settings/settings.interface";

class ClockConfigService {
  getExtraHours() {
    if (MOCKED) return getResponse("getExtraHours", "clockConfig");
    return api().get("/clock-config");
  }

  saveExtraHours(extraHours: clockValues) {
    if (MOCKED) return getResponse("saveExtraHours", "clockConfig");
    return api().post("/clock-config", extraHours);
  }
}

export default new ClockConfigService();
