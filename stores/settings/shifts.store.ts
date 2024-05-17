import { defineStore } from "pinia";
import { shiftsService } from "~/services";
import { WeeklySchedule } from "~/interfaces/settings/shifts.interface";

type ShiftsState = {
  shifts: WeeklySchedule;
};

export const useShiftStore = defineStore("shift", {
  persist: true,
  state(): ShiftsState {
    return {
      shifts: {} as WeeklySchedule,
    };
  },
  actions: {
    async getShifts() {
      try {
        const { shifts } = await shiftsService.getShifts();
        this.shifts = shifts;
      } catch (err) {
        return err as Error;
      }
    },
    async saveShifts(shifts: WeeklySchedule) {
      try {
        await shiftsService.saveShifts(shifts);
      } catch (err) {
        return err as Error;
      }
    },
  },
});
