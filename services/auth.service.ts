import { getResponse } from "./mocks";
import api, { MOCKED } from "@/services/api.service";
import {
  ChangePassword,
  RecoverCode,
  RecoverPassword,
  UserCredentials,
} from "@/interfaces/auth/auth.interface";

class AuthService {
  login(userCredentials: UserCredentials) {
    if (MOCKED) return getResponse("login", "auth");
    return api().post("/auth/login", userCredentials);
  }

  recoverPassword(userId: RecoverPassword) {
    if (MOCKED) return getResponse("recoverPassword", "auth");
    return api().post("/auth/recover-password", userId);
  }

  recoverCode(code: RecoverCode) {
    if (MOCKED) return getResponse("recoverCode", "auth");
    return api().post("/auth/recover-code", code);
  }

  changePassword(newPassword: ChangePassword) {
    if (MOCKED) return getResponse("changePassword", "auth");
    return api().post("/auth/change-password", newPassword);
  }
}

export default new AuthService();
