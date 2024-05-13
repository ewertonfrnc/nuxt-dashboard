<template>
  <div class="calendar-wrapper">
    <Calendar
      v-model="date"
      show-icon
      date-format="dd/mm/yy"
      :selection-mode="selectionMode"
      :pt="{
        root: `date-picker ${inlineIcon && 'date-picker__transparent'}`,
        input: 'date-picker__input',
        panel: 'date-picker__panel',
        header: 'date-picker__header',
        title: 'date-picker__header--title heading__senary',
        container: 'date-picker__container',
        table: 'date-picker__table',
        tableHeaderRow: 'heading__senary',
        tableBodyRow: 'body__primary',
        dayLabel(options) {
          return `date-picker__table--day ${
            options.context.selected && 'date-picker__selected-day'
          }`;
        },
      }"
      @update:model-value="handleDateChange"
    />

    <span v-if="!date && placeholder" class="date-picker__placeholder">{{
      placeholder
    }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { usePrimeVue } from "primevue/config";
import { dateFormatters } from "~/utils/formatters";
import locale from "~/utils/primevue/locale.utils";

type CalendarModes = "multiple" | "range" | "single";
export default {
  props: {
    inlineIcon: { type: Boolean, default: false, required: false },
    placeholder: { type: String, default: "", required: false },
    selectionMode: {
      type: String as PropType<CalendarModes>,
      default: "single",
      required: false,
    },
  },
  emits: ["date-handler"],
  setup() {
    const changeToBR = () => {
      const primevue = usePrimeVue();

      if (primevue.config.locale) {
        primevue.config.locale.dayNamesMin = locale.dayNamesShort;
        primevue.config.locale.monthNames = locale.monthNames;
        primevue.config.locale.monthNamesShort = locale.monthNamesShort;
      }
    };

    return { changeToBR };
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    selectedDay() {
      return this.date && dateFormatters.getDateNumber(this.date);
    },
  },
  mounted() {
    this.changeToBR();
  },
  methods: {
    handleDateChange() {
      this.$emit("date-handler", this.date);
    },
  },
};
</script>
