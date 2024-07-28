import { defineStore } from "pinia";
import {
  ClockClosing,
  QueryClockClosingDetails,
  QueryOpenClockClosings,
  TimeTrackingPeriod,
} from "~/interfaces/time-tracking/time-tracking.interface";
import { timeTrackingService } from "~/services";

type TimeTrackingState = {
  total: number;
  clocks: [];
  employees: ClockClosing[];
  pendingSignatureCount: number;
};

export const useTimeTrackingStore = defineStore("time-tracking", {
  state(): TimeTrackingState {
    return {
      total: 0,
      clocks: [],
      employees: [],
      pendingSignatureCount: 0,
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
        const { total, employees, pendingSignatureCount } =
          await timeTrackingService.getClockClosingDetails(clockId, queries);

        this.pendingSignatureCount = pendingSignatureCount;
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
    async requestSignatureBatch(clockId: string, clocks: ClockClosing[]) {
      try {
        await timeTrackingService.requestSignatureBatch(clockId, clocks);
      } catch (error) {
        return error;
      }
    },
    async generateDocumentAndSend(period: TimeTrackingPeriod) {
      try {
        const { closingId } =
          await timeTrackingService.generateDocumentAndSend(period);
        console.log(closingId);

        return closingId;
      } catch (error) {
        return error;
      }
    },
  },
});
