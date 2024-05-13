import { defineStore } from "pinia";
import {
  ClockClosing,
  QueryClockClosingDetails,
  QueryOpenClockClosings,
} from "~/interfaces/time-tracking/time-tracking.interface";
import { timeTrackingService } from "~/services";

export const useTimeTrackingStore = defineStore("time-tracking", {
  persist: true,
  state() {
    return {
      total: 0,
      clocks: [],
      employees: [],
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
    async getClockClosingDetails(
      clockId: string,
      queries: QueryClockClosingDetails,
    ) {
      try {
        const { total, employees } =
          await timeTrackingService.getClockClosingDetails(clockId, queries);

        this.employees = employees;
        this.total = total;
      } catch (error) {
        return error;
      }
    },
    async requestSignature(clock: ClockClosing) {
      try {
        await timeTrackingService.requestSignature(clock);
      } catch (error) {
        return error;
      }
    },
  },
});
