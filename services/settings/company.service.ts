import { getResponse } from "../mocks";
import api, { MOCKED } from "~/services/api.service";
import { CompanyInfo } from "~/interfaces/settings/company.interface";

class CompanyService {
  getCompanyInfo() {
    if (MOCKED) return getResponse("getCompanyInfo", "company");
    return api().get("/settings/company");
  }

  saveCompanyInfo(companyInfo: CompanyInfo) {
    if (MOCKED) return getResponse("saveCompanyInfo", "company");
    return api().post("/settings/company", companyInfo);
  }
}

export default new CompanyService();
