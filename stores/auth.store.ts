import { authService } from "@/services";
import {
  ChangePassword,
  RecoverCode,
  RecoverPassword,
  UserCredentials,
  UserDetails,
} from "@/interfaces/auth/auth.interface";

type AuthState = {
  user: UserDetails | null;
  authenticated: boolean;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      authenticated: false,
    };
  },
  persist: true,
  actions: {
    async authenticateUser(userCredentials: UserCredentials) {
      try {
        const { user } = await authService.login(userCredentials);
        this.user = { ...user, role: ["manager"] };
        this.authenticated = true;
      } catch (error) {
        return error as Error;
      }
    },
    async recoverPassword(userId: RecoverPassword) {
      try {
        const { userEmail } = await authService.recoverPassword(userId);
        return userEmail;
      } catch (error) {
        return error as Error;
      }
    },
    async recoverCode(code: RecoverCode) {
      try {
        const { status } = await authService.recoverCode(code);
        return status;
      } catch (error) {
        return error as Error;
      }
    },
    async changePassword(newPassword: ChangePassword) {
      try {
        const { status } = await authService.changePassword(newPassword);
        return status;
      } catch (error) {
        return error as Error;
      }
    },
    logUserOut() {
      const cookiesToken = useCookie("token");
      sessionStorage.removeItem("token");

      this.authenticated = false;
      cookiesToken.value = null;
      this.user = null;
    },
  },
});
