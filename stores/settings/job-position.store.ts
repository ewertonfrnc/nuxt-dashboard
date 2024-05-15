import { defineStore } from "pinia";
import { jobPositionService } from "~/services";
import {
  JobPosition,
  QueryJobPositions,
} from "~/interfaces/settings/job-position.interface";

type JobPositionState = {
  total: number;
  roles: JobPosition[];
};

export const useJobPositionStore = defineStore("job-position", {
  persist: true,
  state(): JobPositionState {
    return {
      total: 0,
      roles: [],
    };
  },
  actions: {
    async getCompanyInfo(queries: QueryJobPositions) {
      try {
        const { roles, total } =
          await jobPositionService.getJobPositions(queries);
        this.roles = roles;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async saveCompanyInfo() {
      try {
        const { roles } = await jobPositionService.saveJobPositions();
        this.roles = roles;
      } catch (error) {
        return error as Error;
      }
    },
  },
});
