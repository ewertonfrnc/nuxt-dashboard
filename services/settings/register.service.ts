import { getResponse } from "../mocks";
import api, { MOCKED } from "~/services/api.service";

class RegisterService {
  getWorkOptions() {
    if (MOCKED) return getResponse("getWorkOptions", "register");
    return api().get("/register-options");
  }
}

export default new RegisterService();
