import { defineStore } from "pinia";
import { shiftsService } from "~/services";

export const useShiftStore = defineStore("shift", {
  persist: true,
  state() {
    return {
      shifts: {},
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
  },
});
