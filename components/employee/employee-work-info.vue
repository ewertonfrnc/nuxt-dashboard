<template>
  <VeeForm
    v-slot="{ values }"
    :initial-values="workInfo"
    :validation-schema="formSchema"
    class="container fadein animation-duration-500"
    as="section"
  >
    <div class="container__header">
      <h2 class="heading__secondary">Dados profissionais</h2>
      <div class="container__header--btns">
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
          @click.prevent="handleSubmit(values)"
        />
      </div>
    </div>

    <form class="form" @change="handleChange(values)">
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
            :wrong-crendentials-message="wrongCrendentialsMessage"
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
            @on-change="handleChange(values)"
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
            @on-change="handleChange(values)"
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
            :wrong-crendentials-message="wrongCrendentialsMessage"
            @on-change="handleChange(values)"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          CTPS (Carteira de Trabalho e Previdência Social)

          <BaseInputText
            name="ctps"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
          />
        </label>
      </div>

      <div class="form__control">
        <label class="form__label caption__primary">
          PIS (Programa de Integração Social)

          <BaseInputText
            name="pis"
            :readonly="!isEditing"
            :wrong-crendentials-message="wrongCrendentialsMessage"
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
            :wrong-crendentials-message="wrongCrendentialsMessage"
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

export default {
  data() {
    return {
      loading: false,
      isEditing: false,
      hasChanges: false,
      usePreferredName: false,
      wrongCrendentialsMessage: "",
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
      this.wrongCrendentialsMessage = "";
    },
    async handleSubmit(values: EmployeeWorkInfo) {
      if (this.hasChanges) {
        this.loading = true;
        this.wrongCrendentialsMessage = "";

        try {
          await this.updateEmployeeWorkInfo(String(this.employee.id), values);
          this.isEditing = false;

          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: "Ação realizada com sucesso.",
            life: 4000,
          });
        } catch (error) {
          this.$toast.add({
            severity: "error",
            summary: "Ocorreu um erro!",
            detail: "Ocorreu um erro de processamento, tente novamente.",
            life: 4000,
          });
        } finally {
          this.loading = false;
        }
      } else {
        this.wrongCrendentialsMessage = "Preencha o campo para prosseguir";
      }
    },
    handleChange(values: EmployeeWorkInfo) {
      this.hasChanges = !checkEqualObjs(values, this.employee.workData);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &--btns {
      display: flex;
      gap: 8px;

      button {
        width: max-content;
      }
    }
  }
}

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
