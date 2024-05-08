import { defineStore } from "pinia";
import { homeService } from "~/services";

export const useHomeStore = defineStore("home", {
  persist: true,
  state() {
    return {
      colorPreference: "system",
      indicators: {
        pendingAdjustments: 0,
        collaborators: 0,
        availableClosings: 0,
        monthlyTurnover: 0,
        annualTurnover: 0,
      },
    };
  },
  getters: {},
  actions: {
    async getIndicators() {
      try {
        const { indicators } = await homeService.home();
        this.indicators = indicators;
      } catch (error) {
        return error;
      }
    },
  },
});
