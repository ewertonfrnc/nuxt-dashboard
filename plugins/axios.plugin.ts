import axios from "axios";

makeServer();

export default defineNuxtPlugin((nuxtApp) => {
  const defaultURL = process.env.PORT;

  const api = axios.create({
    baseURL: defaultURL,
    headers: { common: {} },
  });

  return {
    provide: { axios: api },
  };
});
