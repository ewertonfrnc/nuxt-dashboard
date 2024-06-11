import { defineStore } from "pinia";
import { CompanyInfo } from "~/interfaces/settings/company.interface";
import { companyService } from "~/services";

export const useCompanyStore = defineStore("company", {
  persist: true,
  state() {
    return {
      company: {},
    };
  },
  actions: {
    async getCompanyInfo() {
      try {
        const { company } = await companyService.getCompanyInfo();
        this.company = company;
      } catch (error) {
        return error as Error;
      }
    },
    async saveCompanyInfo(companyInfo: CompanyInfo) {
      try {
        const { company } = await companyService.saveCompanyInfo(companyInfo);
        this.company = company;
      } catch (error) {
        return error as Error;
      }
    },
  },
});
