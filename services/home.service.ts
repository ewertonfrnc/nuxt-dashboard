import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";

class HomeService {
  home() {
    if (MOCKED) return getResponse("home", "home");
    return api().get("/home");
  }
}

export default new HomeService();
