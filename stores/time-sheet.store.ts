import { timeSheetService } from "~/services";
import { QueryParams } from "~/interfaces/time-sheet/time-sheet.interface";

type TimeSheetstate = {};

export const useTimeSheetStore = defineStore("time-sheet", {
  persist: true,
  state(): TimeSheetstate {
    return {};
  },
  actions: {
    async getPendingAdjustments(params: QueryParams) {
      try {
        const {
          data: { pending },
        } = await timeSheetService.fetchPendingAdjustments(params);
        return pending;
      } catch (err) {
        return err;
      }
    },
  },
});
