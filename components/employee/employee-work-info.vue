<template>
  <VeeForm
    v-slot="{ values, errors }"
    :initial-values="workInfo"
    :validation-schema="formSchema"
    class="form-container fadein animation-duration-500"
    as="section"
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
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          @click.prevent="handleSubmit(values, errors)"
        />
      </div>
    </div>

    <form class="form" @change="handleChange(values, errors)">
      <div class="form__control">
        <label class="form__label caption__primary">
          Cargo

          <BaseInputText name="role" :readonly="!isEditing" />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Departamento

          <BaseInputText name="department" :readonly="!isEditing" />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Data de admissão

          <BaseInputMask
            name="admissionDate"
            mask="99/99/9999"
            :readonly="!isEditing"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Modelo de trabalho

          <BaseDropdown
            name="workType"
            :readonly="!isEditing"
            :options="workTypeOptions"
            @on-change="handleChange(values, errors)"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Modelo de contratação

          <BaseDropdown
            name="hireType"
            :readonly="!isEditing"
            :options="hireTypeOptions"
            @on-change="handleChange(values, errors)"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Horas semanais

          <BaseDropdown
            name="hoursPerWeek"
            :readonly="!isEditing"
            :options="hoursPerWeekOptions"
            @on-change="handleChange(values, errors)"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          CTPS (Carteira de Trabalho e Previdência Social)

          <BaseInputMask
            name="ctps"
            mask="99999-9999-aa"
            :readonly="!isEditing"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          PIS (Programa de Integração Social)

          <BaseInputMask
            name="pis"
            mask="999.99999.99-9"
            :readonly="!isEditing"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Tempo de empresa

          <BaseInputText
            name="companyTime"
            :readonly="!isEditing"
            :disabled="isEditing"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Data de desligamento

          <BaseInputText name="dismissalDate" :readonly="!isEditing" />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          Motivo de desligamento

          <BaseInputText name="dismissalReason" :readonly="!isEditing" />
        </label>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { checkEqualObjs } from "~/utils/validators";
import { workInfoSchema } from "~/utils/schemas/employee/employee.schema";
import { EmployeeWorkInfo } from "~/interfaces/employee/employee.interface";
import { checkForErrors } from "~/utils/forms";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      hasChanges: false,
      validForm: false,
      usePreferredName: false,
      workTypeOptions: ["Presencial", "Híbrido", "Remoto"],
      hireTypeOptions: ["CLT", "PJ"],
      hoursPerWeekOptions: ["40 horas", "30 horas", "20 horas"],
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    workInfo() {
      return this.employee.workData;
    },
    formSchema() {
      return workInfoSchema;
    },
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeWorkInfo"]),
    handleCheckbox(value: boolean) {
      this.usePreferredName = value;
    },
    handleUpload() {
      this.employee.personalData.profileImg =
        "https://images.unsplash.com/photo-1487573884658-a5d3c667584e?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    },
    cancelEditing() {
      this.isEditing = false;
    },
    async handleSubmit(values: EmployeeWorkInfo) {
      if (!this.hasChanges) return this.cancelEditing();
      if (!this.validForm) return;

      this.loading = true;

      try {
        await this.updateEmployeeWorkInfo(String(this.employee.id), values);
        this.isEditing = false;
        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
    handleChange(values: EmployeeWorkInfo, errors: Object) {
      this.hasChanges = !checkEqualObjs(values, this.employee.workData);
      this.validForm = checkForErrors(errors);
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
