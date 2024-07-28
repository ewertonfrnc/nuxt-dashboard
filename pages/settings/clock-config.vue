<template>
  <BaseCard>
    <VeeForm
      class="form-container"
      :initial-values="initialValues"
      :validation-schema="formSchema"
      @submit="handleSubmit"
    >
      <div class="form-container__header">
        <h2 class="heading__secondary">Parâmetros de ponto</h2>

        <div class="form-container__header--btns">
          <BaseButton
            v-if="!isEditing"
            class="btn__primary"
            icon="pi pi-pencil"
            label="Editar"
            @click="toggleEditing"
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
          />
        </div>
      </div>

      <p class="body__primary">
        Aqui você poderá configurar os parâmetros para o fechamento de ponto.
      </p>

      <div class="form">
        <div class="form__control">
          <BaseFormInputText
            label="Horas extras 1"
            name="extra1"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Horas extras 2"
            name="extra2"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Horas extras 3"
            name="extra3"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Horas extras 4"
            name="extra4"
            :readonly="!isEditing"
          />
        </div>
      </div>
    </VeeForm>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useClockConfigStore } from "~/stores/settings/clock-config.store";
import { clockValues } from "~/interfaces/settings/settings.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,

      initialValues: {},
      formSchema: {
        extra1: "required|min:1|max:3",
        extra2: "required|min:1|max:3",
        extra3: "required|min:1|max:3",
        extra4: "required|min:1|max:3",
      },
    };
  },
  computed: {
    ...mapState(useClockConfigStore, ["hours"]),
  },
  created() {
    this.loadExtraHours();
  },
  methods: {
    ...mapActions(useClockConfigStore, ["getExtraHours", "saveExtraHours"]),
    loadExtraHours() {
      this.getExtraHours()
        .then(() => {
          this.handleInitialValues();
        })
        .catch(() => this.getToast("error"));
    },
    cancelEditing() {
      this.isEditing = false;
      this.handleInitialValues();
    },
    toggleEditing() {
      this.isEditing = true;
      this.handleInitialValues();
    },
    handleInitialValues() {
      this.initialValues = this.isEditing
        ? this.hours
        : Object.values(this.hours).reduce((obj, hour, idx) => {
            obj[`extra${idx + 1}`] = `${hour}%`;
            return obj;
          }, {});
    },
    handleSubmit(values: clockValues) {
      this.loading = true;

      setTimeout(() => {
        this.saveExtraHours(values)
          .then(() => {
            this.cancelEditing();
            this.getToast("success");
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
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
