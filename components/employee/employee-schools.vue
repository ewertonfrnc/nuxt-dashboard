<template>
  <VeeForm
    v-slot="{ values, errors }"
    :initial-values="schoolInfo"
    :validation-schema="formSchema"
    class="container fadein animation-duration-500"
    as="section"
  >
    <pre>{{ errors }}</pre>
    <div class="container__header">
      <h2 class="heading__secondary">Formação acadêmica</h2>
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

    <form class="form" @change="handleChange(values, errors)">
      <div class="form__container">
        <div class="form__control">
          <label class="form__label caption__primary">
            Curso

            <BaseInputText
              name="course"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Instituição de ensino

            <BaseInputText
              name="educationalInstitution"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Status
            <BaseDropdown
              name="status"
              :readonly="!isEditing"
              :options="statusOptions"
              :wrong-crendentials-message="wrongCrendentialsMessage"
              @on-change="handleChange(values, errors)"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Ano de ingresso

            <BaseInputText
              name="entryYear"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Semestre de ingresso

            <BaseDropdown
              name="entrySemester"
              :readonly="!isEditing"
              :options="semesterOptions"
              :wrong-crendentials-message="wrongCrendentialsMessage"
              @on-change="handleChange(values, errors)"
            />
          </label>
        </div>

        <div class="form__control">
          <label class="form__label caption__primary">
            Ano de conclusão

            <BaseInputText
              name="conclusionYear"
              :readonly="!isEditing"
              :wrong-crendentials-message="wrongCrendentialsMessage"
            />
          </label>
        </div>
      </div>
    </form>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { schoolFormSchema } from "~/utils/schemas/employee/employee.schema";
import { checkEqualObjs } from "~/utils/validators";
import { EmployeeSchoolInfo } from "~/interfaces/employee/employee.interface";
import { checkForErrors } from "~/utils/forms";

export default {
  data() {
    return {
      loading: false,
      isEditing: false,
      hasChanges: false,
      validForm: true,
      usePreferredName: false,
      wrongCrendentialsMessage: "",
      statusOptions: ["Em curso", "Concluído", "Incompleto"],
      semesterOptions: ["1", "2"],
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
    schoolInfo() {
      return this.employee.schoolInfo;
    },
    formSchema() {
      return schoolFormSchema;
    },
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeData"]),
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
    async handleSubmit(values: EmployeeSchoolInfo) {
      if (this.hasChanges && this.validForm) {
        this.loading = true;
        this.wrongCrendentialsMessage = "";

        try {
          await this.updateEmployeeData(String(this.employee.id), values);
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
    handleChange(values: EmployeeSchoolInfo, errors: Object) {
      this.hasChanges = !checkEqualObjs(values, this.employee.personalData);
      this.validForm = checkForErrors(errors);
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
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

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
