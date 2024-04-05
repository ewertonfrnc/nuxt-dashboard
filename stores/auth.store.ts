export type User = {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  role: string;
  token: string;
  username: string;
};

type AuthState = {
  user: User | null;
  authenticated: boolean;
};

export type AuthValues = { username: string; password: string };

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      authenticated: false,
    };
  },
  persist: true,
  actions: {
    async authenticateUser(authValues: AuthValues) {
      const { data: userInfo }: any = await useFetch(
        "https://dummyjson.com/auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: { username: "kminchelle", password: "0lelplR" },
        },
      );

      if (userInfo.value) {
        this.user = { ...userInfo.value, role: ["manager"] };
        this.authenticated = true;

        return this.user;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
      this.user = null;
    },
  },
});
