<template>
  <div class="calendar-wrapper">
    <Calendar
      v-model="date"
      show-icon
      date-format="dd/mm/yy"
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
      }"
      @update:model-value="handleDateChange"
    >
      <template #date="{ date }">
        <span
          :class="[
            'date-picker__table--day',
            !date.selectable && 'date-picker__disabled',
            selectedDay === date.day &&
              date.selectable &&
              'date-picker__selected-day',
          ]"
        >
          {{ date.day }}
        </span>
      </template>
    </Calendar>

    <span v-if="!date && placeholder" class="date-picker__placeholder">{{
      placeholder
    }}</span>
  </div>
</template>

<script lang="ts">
import { usePrimeVue } from "primevue/config";
import { dateFormatters } from "~/utils/formatters";
import locale from "~/utils/primevue/locale.utils";

export default {
  props: {
    inlineIcon: { type: Boolean, default: false, required: false },
    placeholder: { type: String, default: "", required: false },
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
