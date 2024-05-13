import { defineStore } from "pinia";
import { QueryOpenClockClosings } from "~/interfaces/time-tracking/time-tracking.interface";
import { timeTrackingService } from "~/services";

export const useTimeTrackingStore = defineStore("time-tracking", {
  persist: true,
  state() {
    return {
      total: 0,
      clocks: [],
    };
  },
  actions: {
    async getOpenClockClosing(queries: QueryOpenClockClosings) {
      try {
        const { total, clocks } =
          await timeTrackingService.getOpenClockClosing(queries);

        this.clocks = clocks;
        this.total = total;
      } catch (error) {
        return error;
      }
    },
  },
});
