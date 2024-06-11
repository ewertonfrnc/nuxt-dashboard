<template>
  <div class="shift">
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
          v-slot="{ values }"
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
            <BaseFormTimePicker
              label="Entrada"
              name="start"
              :readonly="!isEditing"
              @time-change="handleChange(values, idx)"
            />
            <BaseFormTimePicker
              label="Saída"
              name="end"
              :readonly="!isEditing"
              @time-change="handleChange(values, idx)"
            />
          </div>

          <small
            v-if="isEditing && interval.invalid"
            class="shift__error caption__secondary"
            v-text="'Entrada inválida'"
          />
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
import { GenericObject } from "vee-validate";
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
    handleChange(values: GenericObject, intervalIdx: number) {
      const formValues = { ...values } as Interval;

      if (intervalIdx < this.intervals.length) {
        this.intervals[intervalIdx] = { ...formValues };
      } else {
        this.intervals.splice(intervalIdx, 0, { ...formValues });
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

  &__error {
    color: map-get($color-scheme-light, "$color-feedback-danger-0");
  }

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
  }

  &__footer {
    align-self: end;
  }
}
</style>
