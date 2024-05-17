<template>
  <div class="shift">
    <!--    {{ shifts[dayOfWeek].intervals }}-->
    <div class="shift__header">
      <h5 class="heading__quinary">{{ day.title }}</h5>
    </div>

    <div
      v-if="day.intervals.length"
      :class="['shift__block', isEditing && 'shift__block--editing']"
    >
      <transition-group>
        <VeeForm
          v-for="(interval, idx) in day.intervals"
          v-slot="{ values, meta, errors }"
          :key="idx"
          :initial-values="interval"
          :validation-schema="formSchema"
          class="shift__form"
        >
          <div class="shift__block--header">
            <span class="caption__primary">{{ idx + 1 }}º Intervalo</span>

            <transition>
              <div v-if="isEditing">
                <BaseButton
                  class="btn__danger--text"
                  label="remover"
                  @click="removeField(idx)"
                />
              </div>
            </transition>
          </div>

          <div class="shift__interval">
            <VeeField v-slot="{ field, errors }" name="start" as="label">
              <span class="caption__primary">Entrada</span>
              <input
                type="time"
                v-bind="field"
                class="input__field body__primary"
                :readonly="!isEditing"
                @input="handleChange(values, idx, errors)"
              />

              <small
                v-for="error in errors"
                v-if="isEditing"
                class="caption__secondary input__error"
                >{{ error }}</small
              >
            </VeeField>

            <VeeField v-slot="{ field, errors }" name="end" as="label">
              <span class="caption__primary">Saída</span>
              <input
                type="time"
                v-bind="field"
                class="input__field body__primary"
                :readonly="!isEditing"
                @input="handleChange(values, idx, errors)"
              />

              <small
                v-for="error in errors"
                v-if="isEditing"
                class="caption__secondary input__error"
                >{{ error }}</small
              >
            </VeeField>
          </div>
        </VeeForm>
      </transition-group>

      <transition>
        <BaseButton
          v-if="isEditing"
          label="Adicionar intervalo"
          class="btn__primary--outlined"
          @click="addNewField"
        />
      </transition>
    </div>

    <div v-else>
      <transition>
        <BaseButton
          v-if="isEditing"
          label="Adicionar intervalo"
          class="btn__primary--outlined"
          @click="addNewField"
        />
      </transition>
    </div>

    <div class="shift__footer">
      <p class="heading__quinary">Total: {{ day.total }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { shiftSchema } from "~/utils/schemas/settings/shifts.schema";
import { Interval } from "~/interfaces/settings/shifts.interface";

export default {
  props: {
    dayOfWeek: { type: String, default: "", required: true },
    shifts: { type: Object, required: true },
    isEditing: { type: Boolean, default: false, required: true },
  },
  emits: ["handle-day-change"],
  data() {
    return {
      day: this.shifts[this.dayOfWeek],
      intervals: this.shifts[this.dayOfWeek].intervals,
      checkinOptions: ["08:00", "09:00", "10:00", "11:00", "12:00"],
      checkoutOptions: ["13:00", "14:00", "15:00", "16:00", "17:00"],
    };
  },
  computed: {
    formSchema() {
      return shiftSchema;
    },
  },
  mounted() {},
  methods: {
    addNewField() {
      this.day.intervals.push({ start: "", end: "" });
    },
    removeField(index: number) {
      this.intervals.splice(index, 1);
    },
    handleChange(values: Interval, intervalIdx: number) {
      if (intervalIdx < this.intervals.length) {
        this.intervals[intervalIdx] = { ...values };
      } else {
        this.intervals.splice(intervalIdx, 0, { ...values });
      }

      this.$emit("handle-day-change", {
        day: this.dayOfWeek,
        intervals: [...this.intervals],
      });
    },
  },
};
</script>

<style scoped lang="scss">
.shift {
  height: fit-content;
  display: grid;
  gap: 8px;
  border: $border-light;
  border-radius: 8px;
  padding: 16px;

  &__block {
    &--editing {
      height: 420px;
      overflow: auto;
    }

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        padding: 0 5px;
      }
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 18px;

    &:not(:last-child) {
      border-bottom: $border-light;
      padding-bottom: 18px;
      margin-bottom: 18px;
    }
  }

  &__interval {
    display: flex;
    gap: 8px;

    label {
      width: 100%;
    }
  }

  &__footer {
    align-self: end;
  }
}
</style>
