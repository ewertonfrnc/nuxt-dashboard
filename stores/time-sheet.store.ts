import { timeSheetService } from "~/services";
type TimeSheetstate = {};

export const useTimeSheetStore = defineStore("time-sheet", {
  persist: true,
  state(): TimeSheetstate {
    return {};
  },
  actions: {
    async getPendingAdjustments() {
      try {
        const {
          data: { pending },
        } = await timeSheetService.fetchPendingAdjustments();
        return pending;
      } catch (err) {
        console.log("err", err);
      }
    },
  },
});
