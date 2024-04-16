<template>
  <Calendar
    v-model="date"
    show-icon
    date-format="dd/mm/yy"
    :pt="{
      root: 'date-picker',
      input: 'date-picker__input',
      panel: 'date-picker__panel',
      header: 'date-picker__header',
      title: 'date-picker__header--title heading__senary',
      container: 'date-picker__container',
      table: 'date-picker__table',
      tableHeaderRow: 'heading__senary',
      tableBodyRow: 'body__primary',
    }"
  >
    <template #date="{ date }">
      <span
        :class="[
          'date-picker__table--day',
          selectedDay === date.day && 'date-picker__selected-day',
        ]"
      >
        {{ date.day }}
      </span>
    </template>
  </Calendar>
</template>

<script lang="ts">
import { usePrimeVue } from "primevue/config";
import { dateFormatters } from "~/utils/formatters";
import locale from "~/utils/primevue/locale.utils";

export default {
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
  mounted() {
    this.changeToBR();
  },
  computed: {
    selectedDay() {
      return this.date && dateFormatters.getDateNumber(this.date);
    },
  },
};
</script>
