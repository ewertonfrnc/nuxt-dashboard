import api from "~/services/api.service";

class HomeService {
  home() {
    return api().get("/api/home");
  }
}

export default new HomeService();
