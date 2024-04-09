import axios from "axios";

export default function api() {
  const cookiesToken = useCookie("token");
  const sessionToken = sessionStorage.getItem("token");
  const token = cookiesToken.value || sessionToken;

  return axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
