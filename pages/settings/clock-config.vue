<template>
  <BaseCard>
    <VeeForm
      v-slot="{ values, meta }"
      :initial-values="!isEditing ? formValuesView : formValues"
      :validation-schema="formSchema"
      as="div"
      class="form-container"
    >
      <div class="form-container__header">
        <h2 class="heading__secondary">Parâmetros de ponto</h2>

        <div class="form-container__header--btns">
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
            :disabled="!validForm"
            @click.prevent="handleSubmit(values)"
          />
        </div>
      </div>

      <p class="body__primary">
        Aqui você poderá configurar os parâmetros para o fechamento de ponto.
      </p>

      <form class="form" @change="handleChange(values, meta.valid)">
        <div class="form__control">
          <label class="form__label caption__primary">
            Horas extras 1

            <BaseInputText name="extra1" :readonly="!isEditing" />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Horas extras 2

            <BaseInputText name="extra2" :readonly="!isEditing" />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Horas extras 3

            <BaseInputText name="extra3" :readonly="!isEditing" />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Horas extras 4

            <BaseInputText name="extra4" :readonly="!isEditing" />
          </label>
        </div>
      </form>
    </VeeForm>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useClockConfigStore } from "~/stores/settings/clock-config.store";
import { clocksSettingsSchema } from "~/utils/schemas/settings/settings.schema";
import { checkEqualObjs } from "~/utils/validators";
import { clockValues } from "~/interfaces/settings/settings.interface";

export default {
  data() {
    return {
      isEditing: false,
      hasChanges: false,
      validForm: true,
    };
  },
  computed: {
    ...mapState(useClockConfigStore, ["hours"]),
    formValues() {
      return this.hours;
    },
    formValuesView() {
      return Object.values(this.hours).reduce((obj, hour, idx) => {
        obj[`extra${idx + 1}`] = `${hour}%`;
        return obj;
      }, {});
    },
    formSchema() {
      return clocksSettingsSchema;
    },
  },
  created() {
    this.getExtraHours();
  },
  methods: {
    ...mapActions(useClockConfigStore, ["getExtraHours", "saveExtraHours"]),
    cancelEditing() {
      this.isEditing = false;
    },
    handleSubmit(values: clockValues) {
      if (!this.hasChanges) return this.cancelEditing();
      if (!this.validForm) return;

      this.saveExtraHours(values);
    },
    handleChange(values: clockValues, valid: boolean) {
      this.hasChanges = !checkEqualObjs(values, this.hours);
      this.validForm = valid;
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @include respond(phone) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__control {
    &--checkbox {
      display: flex;
      align-items: center;
      gap: 8px;

      label {
        color: map-get($color-scheme-light, "$color-neutral-neutral-2");
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
}
</style>
