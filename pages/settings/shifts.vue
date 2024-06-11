<template>
  <BaseCard class="shifts">
    <div class="shifts__container--header">
      <h2 class="heading__secondary">Turnos da empresa</h2>

      <div class="shifts__container shifts__container--btn-group">
        <BaseButton
          v-if="!isEditing"
          class="btn__primary"
          icon="pi pi-pencil"
          label="Editar"
          @click="isEditing = true"
        />

        <BaseButton
          v-if="isEditing"
          class="btn__danger--outlined"
          icon="pi pi-times"
          label="Cancelar"
          :disabled="loading"
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          :loading="loading"
          :disabled="loading || !validForm"
          @click.prevent="handleSubmit"
        />
      </div>
    </div>

    <p class="body__primary">
      Para ajudar seus colaboradores com pontos, enviaremos notificações nos
      horários de início e fim de turno
    </p>

    <div class="shifts__display">
      <ShiftsCard
        v-for="(day, idx) in dayNames"
        :key="idx"
        :day-of-week="day"
        :shifts="workSchedule"
        :is-editing="isEditing"
        @handle-day-change="handleChange"
      />
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useShiftStore } from "~/stores/settings/shifts.store";
import {
  Interval,
  SimpleShift,
  WeeklySchedule,
} from "~/interfaces/settings/shifts.interface";
import { timeFormatters } from "~/utils/formatters";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      validForm: true,
      dayNames: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      checkinOptions: ["08:00", "09:00", "10:00", "11:00", "12:00"],
      checkoutOptions: ["13:00", "14:00", "15:00", "15:00", "17:00"],
      workSchedule: {} as WeeklySchedule,
    };
  },
  computed: {
    ...mapState(useShiftStore, ["shifts"]),
  },
  created() {
    this.getShifts();
    this.workSchedule = this.shifts;
  },
  methods: {
    ...mapActions(useShiftStore, ["getShifts", "saveShifts"]),
    cancelEditing() {
      this.isEditing = false;
    },
    handleChange(dayObj: SimpleShift) {
      const { day, intervals } = dayObj;

      this.workSchedule[day].intervals = intervals.map(({ start, end }) => {
        const startTime =
          typeof start === "object" ? timeFormatters.getOnlyTime(start) : start;
        const endTime =
          typeof end === "object" ? timeFormatters.getOnlyTime(end) : end;

        return { start: startTime, end: endTime, invalid: startTime > endTime };
      });
      this.validForm = true;
    },
    handleSubmit() {
      this.dayNames.forEach((day) =>
        this.workSchedule[day].intervals.forEach(
          ({ start, end, invalid }: Interval) => {
            if (!start || !end || invalid) this.validForm = false;
          },
        ),
      );

      if (!this.validForm) return;

      this.loading = true;
      setTimeout(() => {
        this.saveShifts(this.workSchedule)
          .then(() => this.getToast("success"))
          .catch(() => this.getToast("error"))
          .finally(() => {
            this.loading = false;
            this.isEditing = false;
          });
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.shifts {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__container {
    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--btn-group {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        width: max-content;
      }
    }
  }

  &__display {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 16px;
  }
}
</style>
