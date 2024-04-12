import { timeSheetService } from "~/services";
import {
  QueryParams,
  User,
  Request,
} from "~/interfaces/time-sheet/time-sheet.interface";

type TimeSheetstate = {
  userPendingRequests: User | null;
};

export const useTimeSheetStore = defineStore("time-sheet", {
  persist: true,
  state(): TimeSheetstate {
    return {
      userPendingRequests: null,
    };
  },
  actions: {
    async getPendingAdjustments(params: QueryParams) {
      try {
        const {
          data: { pending, total },
        } = await timeSheetService.fetchPendingAdjustments(params);
        return { pending, total };
      } catch (err) {
        return err;
      }
    },
    async getUserPendingAdjustments(userId: number) {
      try {
        const { data } =
          await timeSheetService.fetchUserPendingAdjustments(userId);

        this.userPendingRequests = data;

        return data;
      } catch (err) {
        return err as Error;
      }
    },
    async updateRequestsApproval(userId: number, updatedRequests: Request[]) {
      try {
        await timeSheetService.updatePendingAdjustments(
          userId,
          updatedRequests,
        );
      } catch (err) {
        return err as Error;
      }
    },
  },
});
