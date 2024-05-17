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
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
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
        :shifts="shifts"
        :is-editing="isEditing"
        @handle-day-change="handleChange"
      />
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useShiftStore } from "~/stores/settings/shifts.store";

export default {
  data() {
    return {
      loading: false,
      isEditing: false,
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
    };
  },
  computed: {
    ...mapState(useShiftStore, ["shifts"]),
  },
  created() {
    this.getShifts();
  },
  methods: {
    ...mapActions(useShiftStore, ["getShifts"]),
    cancelEditing() {
      this.isEditing = false;
    },
    handleChange(dayObj) {
      const { day, intervals } = dayObj;
      console.log("dayObj", { ...dayObj });
      this.shifts[day].intervals = intervals;

      console.log(`shift`, this.shifts[day]);
    },

    handleSubmit() {
      console.log("submit");
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
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}
</style>
