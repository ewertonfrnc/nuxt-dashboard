import { getResponse } from "../mocks";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import api, { MOCKED } from "~/services/api.service";

class RegisterService {
  getWorkOptions() {
    if (MOCKED) return getResponse("getWorkOptions", "register");
    return api().get("/register-options");
  }

  saveEmployeesBatch(batch: RegisterEmployee[]) {
    if (MOCKED) return getResponse("saveEmployeesBatch", "register");
    return api().post("/register", batch);
  }
}

export default new RegisterService();
