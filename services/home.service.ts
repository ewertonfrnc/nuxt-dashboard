import api from "~/services/api.service";

class HomeService {
  home() {
    return api().get("/home");
  }
}

export default new HomeService();
