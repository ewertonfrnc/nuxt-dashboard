import api from "@/services/api.service";
import { UserCredentials } from "@/interfaces/auth/auth.interface";

class AuthService {
  login(userCredentials: UserCredentials) {
    return api().post("/login", userCredentials);
  }
}

export default new AuthService();
