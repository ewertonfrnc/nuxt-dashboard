import axios from "axios";

export const MOCKED = true;

export default function api() {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();
  const router = useRouter();

  const cookiesToken = useCookie("token");
  const sessionToken = sessionStorage.getItem("token");
  const token = cookiesToken.value || sessionToken;

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const errorsToRedirect = [];
  axiosInstance.interceptors.response.use(null, (error) => {
    const err = error.toJSON();

    if (errorsToRedirect.includes(err.status)) {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/auth");
    } else if (err.message.toUpperCase() === "NETWORK ERROR") {
      router.push("/conection-error");
    } else {
      router.push("/request-error");
    }
    return Promise.reject(error);
  });

  return axiosInstance;
}
