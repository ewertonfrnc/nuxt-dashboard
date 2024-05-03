<template>
  <div class="clocks__content">
    <div>
      <VeeForm v-slot="{ values }" :initial-values="initialValues" as="div">
        <form class="form" @change="handleChange(values)">
          <TransitionGroup>
            <div
              v-for="(hour, index) in allClocks"
              :key="index"
              class="form__control"
            >
              <label v-if="hour.in" class="caption__primary">
                Check-in
                <BaseInputMask
                  :readonly="!isEditing"
                  mask="99:99:99"
                  :name="`checkin-${index}`"
                />
              </label>

              <label v-if="hour.out" class="caption__primary">
                Check-out
                <BaseInputMask
                  :readonly="!isEditing"
                  mask="99:99:99"
                  :name="`checkout-${index}`"
                />
              </label>
            </div>
          </TransitionGroup>
        </form>
      </VeeForm>

      <BaseButton
        v-if="isEditing"
        class="btn__primary--text fadein animation-duration-500"
        icon="pi pi-plus"
        label="Adicionar horário"
        @click="generateHourField"
      />
    </div>

    <div class="clocks__summary">
      <div class="clocks__summary--info">
        <p class="caption__primary">
          {{ isEditing ? "Saldo antes do ajuste:" : "Saldo total do dia:" }}
        </p>
        <span class="body__primary clocks__summary--positive">{{
          selectedClock.requests.currentBalance
        }}</span>
      </div>

      <div
        v-if="isEditing"
        class="clocks__summary--info fadein animation-duration-500"
      >
        <p class="caption__primary">Após o ajuste:</p>
        <span class="body__primary clocks__summary--positive">{{
          balanceAfterAdjusts || selectedClock.requests.currentBalance
        }}</span>
      </div>
    </div>

    <div class="clocks__content--footer">
      <BaseButton
        v-if="!isEditing"
        class="btn__primary--outlined"
        icon="pi pi-times"
        label="Fechar"
        @click="handleCancel"
      />

      <BaseDialogFooter
        v-else
        :loading="loading"
        :show-error-message="showErrorMessage"
        message="Efetue um alteração para prosseguir"
        @click-handler="footerActionHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
// import yup from "~/utils/validator";
import { DateTime, Duration } from "luxon";
import { AdjustClocks } from "~/interfaces/employee/employee.interface";

export default {
  props: {
    handleCancel: { type: Function as PropType<() => void>, required: true },
    handleSave: {
      type: Function as PropType<(values: AdjustClocks) => void>,
      required: true,
    },
    loading: { type: Boolean, default: false, required: true },
    isEditing: { type: Boolean, default: false, required: true },
    hasChanges: { type: Boolean, default: false, required: true },
    showErrorMessage: { type: Boolean, default: false, required: true },
    selectedClock: { type: Object, required: true },
  },
  emits: ["handle-change"],
  data() {
    return {
      initialValues: {},
      allClocks: [...this.selectedClock.requests.hours],
      additionalClocks: [],
      formValues: {},
      balanceAfterAdjusts: "",
    };
  },
  created() {
    // this.generateFormRules();
    this.generateInitialValues();
  },
  methods: {
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.handleSave(this.formValues);
      else this.handleCancel();
    },
    handleChange(values: AdjustClocks) {
      this.$emit("handle-change", true);
      this.formValues = { ...values };

      let totalHours = 0;
      let totalMinutes = 0;
      let newDate = DateTime.fromISO(values["checkin-0"]);
      Object.values(values).forEach((value) => {
        const dateTime = DateTime.fromISO(value);

        const diff = dateTime.diff(newDate, ["hours", "minutes"]);
        const { hours, minutes } = diff.toObject();

        newDate = dateTime;

        totalHours += hours;
        totalMinutes += minutes;

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
      });

      const currentBalance = DateTime.fromFormat(
        this.selectedClock.requests.currentBalance,
        "+ H'h' mm'm'",
      );
      const diffDate = DateTime.fromObject({
        hour: totalHours,
        minute: totalMinutes,
      });

      this.balanceAfterAdjusts = diffDate.toFormat("+ h'h' mm'm'");
    },
    generateHourField() {
      this.additionalClocks = [{ in: "08:00:00", out: "12:00:00" }];
      this.allClocks = [...this.allClocks, ...this.additionalClocks];
    },
    generateInitialValues() {
      let values = {};

      this.selectedClock.requests.hours.forEach((hour, index) => {
        Object.keys(hour).forEach((key) => {
          if (key === "in") {
            values = {
              ...values,
              [`checkin-${index}`]: hour.in,
            };
          } else {
            values = {
              ...values,
              [`checkout-${index}`]: hour.out,
            };
          }
        });
      });

      this.initialValues = values;
    },
    // generateFormRules() {
    //   let rules = {};
    //   const commonRule = yup.string().required().trim();
    //
    //   this.selectedClock.requests.hours.forEach((hour, index) => {
    //     Object.keys(hour).forEach((hour) => {
    //       if (hour === "in") {
    //         rules = { ...rules, [`checkin-${index}`]: commonRule };
    //       } else {
    //         rules = { ...rules, [`checkout-${index}`]: commonRule };
    //       }
    //     });
    //   });
    //   return rules;
    // },
  },
};
</script>

<style scoped lang="scss">
.form {
  max-height: 330px;
  overflow-y: auto;
  margin-bottom: 8px;
  padding-right: 24px;
  border-right: 1px solid
    map-get($color-scheme-light, "$color-neutral-neutral-4");
}

.form__control {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 25px;
  }

  label {
    width: 85px;
  }
}

.clocks {
  &__content {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 4fr 3fr;
    gap: 24px;

    &--footer {
      width: 100%;
      grid-column: span 2;
      justify-self: end;

      button {
        width: max-content;
        margin-left: auto;
      }
    }
  }

  &__summary {
    &--info {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    &--positive {
      color: map-get($color-scheme-light, "$color-feedback-success-0");
    }

    &--negative {
      color: map-get($color-scheme-light, "$color-feedback-danger-0");
    }
  }
}
</style>
