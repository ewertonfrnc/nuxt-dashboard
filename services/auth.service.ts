import api from "@/services/api.service";
import {
  ChangePassword,
  RecoverCode,
  RecoverPassword,
  UserCredentials,
} from "@/interfaces/auth/auth.interface";

class AuthService {
  login(userCredentials: UserCredentials) {
    return api().post("/auth/login", userCredentials);
  }

  recoverPassword(userId: RecoverPassword) {
    return api().post("/auth/recover-password", userId);
  }

  recoverCode(code: RecoverCode) {
    return api().post("/auth/recover-code", code);
  }

  changePassword(newPassword: ChangePassword) {
    return api().post("/auth/change-password", newPassword);
  }
}

export default new AuthService();
