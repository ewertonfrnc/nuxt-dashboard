import { defineStore } from "pinia";
import { clockValues } from "~/interfaces/settings/settings.interface";
import { clockConfigService } from "~/services";

export const useClockConfigStore = defineStore("clock-config", {
  state() {
    return {
      hours: {},
    };
  },
  actions: {
    async getExtraHours() {
      try {
        const { hours } = await clockConfigService.getExtraHours();
        this.hours = hours;
      } catch (error) {
        return error as Error;
      }
    },
    async saveExtraHours(extraHours: clockValues) {
      try {
        const { hours } = await clockConfigService.saveExtraHours(extraHours);
        this.hours = hours;
      } catch (error) {
        return error as Error;
      }
    },
  },
});
