import { authService } from "@/services";
import { UserCredentials } from "@/interfaces/auth/auth.interface";

export type User = {
  id: number;
  cnpj: string;
  email: string;
  image: string;
  token: string;
  gender: string;
  lastName: string;
  firstName: string;
  companyName: string;
  role: string | string[];
};

type AuthState = {
  user: User | null;
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
        const { data: user } = await authService.login(userCredentials);
        this.user = { ...user, role: ["manager"] };
        this.authenticated = true;
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
