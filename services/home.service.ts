import { getResponse } from "./mocks";
import api, { MOCKED } from "~/services/api.service";

class HomeService {
  home() {
    if (MOCKED) return getResponse("login", "home");
    return api().get("/home");
  }
}

export default new HomeService();
