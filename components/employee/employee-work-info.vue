<template>
  <VeeForm
    class="form-container fadein animation-duration-500"
    :initial-values="initialValues"
    :validation-schema="formSchema"
    @submit="handleSubmit"
  >
    <div class="form-container__header">
      <h2 class="heading__secondary">Dados profissionais</h2>
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

    <div class="form">
      <div class="form__control">
        <BaseFormInputText label="Cargo" name="role" :readonly="!isEditing" />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Departamento"
          name="department"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="Data de admissão"
          name="admissionDate"
          mask="99/99/9999"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Modelo de trabalho"
          name="workType"
          :readonly="!isEditing"
          :options="workTypeOptions"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Modelo de contratação"
          name="hireType"
          :readonly="!isEditing"
          :options="hireTypeOptions"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Horas semanais"
          name="hoursPerWeek"
          :readonly="!isEditing"
          :options="hoursPerWeekOptions"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="CTPS (Carteira de Trabalho e Previdência Social)"
          name="ctps"
          mask="99999-9999-aa"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="PIS (Programa de Integração Social)"
          name="pis"
          mask="999.99999.99-9"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Tempo de empresa"
          name="companyTime"
          :readonly="!isEditing"
          :disabled="isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Data de desligamento"
          name="dismissalDate"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Motivo de desligamento"
          name="dismissalReason"
          :readonly="!isEditing"
        />
      </div>
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { GenericObject } from "vee-validate";
import { EmployeeWorkInfo } from "~/interfaces/employee/employee.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      hireTypeOptions: ["CLT", "PJ"],
      workTypeOptions: ["Presencial", "Híbrido", "Remoto"],
      hoursPerWeekOptions: ["40 horas", "30 horas", "20 horas"],

      initialValues: {},
      formSchema: {
        admissionDate: "date",
        ctps: "required|ctps",
        pis: "required|pis",
        companyTime: "required",
      },
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  created() {
    this.initialValues = this.employee.workData;
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeWorkInfo"]),
    cancelEditing() {
      this.isEditing = false;
    },
    handleSubmit(values: GenericObject) {
      const formData = { ...values } as EmployeeWorkInfo;

      this.loading = true;
      setTimeout(() => {
        this.updateEmployeeWorkInfo(String(this.employee.id), formData)
          .then(() => {
            this.isEditing = false;
            this.getToast("success");
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  &__additional {
    margin-top: 24px;
    display: grid;
    gap: 24px;
  }

  &__figure {
    width: 100%;
    display: flex;
    gap: 24px;

    img {
      border-radius: 8px;
      overflow: hidden;
      width: 130px;
      height: 92px;
    }

    figcaption {
      align-self: center;
    }
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

    &--highlight {
      width: 359px;
      padding: 10px;
      border: 1px solid #6e57f5;
      border-radius: 8px;
    }
  }
}
</style>
