import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { ToastPassThroughAttributes } from "primevue/toast";
import { useAuthStore, User } from "~/stores/auth.store";

const handleUnauthorizedAccess = (toast: ToastPassThroughAttributes) => {
  toast.add({
    severity: "error",
    summary: "Acesso negado!",
    detail: "Você não tem autorização para acessar esta página",
    life: 3000,
  });
};

const checkPermissions = (user: User, authorizedFor: string[]) => {
  if (Array.isArray(user.role)) {
    return user.role.some((role) => authorizedFor.includes(role));
  } else {
    return authorizedFor.includes(user.role);
  }
};

export default defineNuxtRouteMiddleware((to) => {
  const toast = useToast();

  const cookiesToken = useCookie("token");
  const sessionToken = sessionStorage.getItem("token");
  const token = cookiesToken.value || sessionToken;
  const { user } = useAuthStore();
  const { authenticated } = storeToRefs(useAuthStore());

  if (token) {
    authenticated.value = true;

    if (to?.name === "login") return navigateTo("/");

    if (user && to.meta.authorizedFor) {
      // @ts-ignore
      if (!checkPermissions(user, to.meta.authorizedFor)) {
        handleUnauthorizedAccess(toast);
        return abortNavigation();
      }
    }
  }

  if (!token) {
    if (to?.name !== "login") {
      abortNavigation();
      return navigateTo("/login");
    }
  }
});
