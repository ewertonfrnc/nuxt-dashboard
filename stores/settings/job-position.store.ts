import { defineStore } from "pinia";
import { jobPositionService } from "~/services";
import {
  JobPosition,
  JobRole,
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
    async getJobPositions(queries: QueryJobPositions) {
      try {
        const { roles, total } =
          await jobPositionService.getJobPositions(queries);
        this.roles = roles;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async saveJobPositions(role: JobRole) {
      try {
        const { roles, total } =
          await jobPositionService.saveJobPositions(role);
        this.roles = roles;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async deleteJobPosition(role: JobPosition) {
      try {
        await jobPositionService.deleteJobPosition(role);
      } catch (err) {
        return err as Error;
      }
    },
  },
});
