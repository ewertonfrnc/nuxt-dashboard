import { timeSheetService } from "~/services";
import {
  QueryParams,
  User,
} from "~/interfaces/time-sheet/time-sheet.interface";

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
    async getUserPendingAdjustments(userId: number): Promise<User | Error> {
      try {
        const { data: userPendingDetails } =
          await timeSheetService.fetchUserPendingAdjustments(userId);
        return userPendingDetails;
      } catch (err) {
        return err as Error;
      }
    },
  },
});
