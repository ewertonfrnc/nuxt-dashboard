<template>
  <VeeForm
    class="form-container fadein animation-duration-500"
    :initial-values="initialValues"
    :validation-schema="formSchema"
    @submit="handleSubmit"
  >
    <div class="form-container__header">
      <h2 class="heading__secondary">Formação acadêmica</h2>
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
      <div class="form__container">
        <div class="form__control">
          <BaseFormInputText
            label="Curso"
            name="course"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Instituição de ensino"
            name="educationalInstitution"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormDropdown
            label="Status"
            name="status"
            :readonly="!isEditing"
            :options="statusOptions"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Ano de ingresso"
            name="entryYear"
            :readonly="!isEditing"
          />
        </div>

        <div class="form__control">
          <BaseFormDropdown
            label="Semestre de ingresso"
            name="entrySemester"
            :readonly="!isEditing"
            :options="semesterOptions"
          />
        </div>

        <div class="form__control">
          <BaseFormInputText
            label="Ano de conclusão"
            name="conclusionYear"
            :readonly="!isEditing"
          />
        </div>
      </div>
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { GenericObject } from "vee-validate";
import { EmployeeSchoolInfo } from "~/interfaces/employee/employee.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      semesterOptions: ["1", "2"],
      statusOptions: ["Em curso", "Concluído", "Incompleto"],

      initialValues: {} as EmployeeSchoolInfo,
      formSchema: {
        course: "required|alpha_spaces",
        educationalInstitution: "required|alpha_spaces",
      },
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  created() {
    this.initialValues = this.employee.schoolInfo;
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeSchool"]),
    cancelEditing() {
      this.isEditing = false;
    },
    handleSubmit(values: GenericObject) {
      const formData = { ...values } as EmployeeSchoolInfo;

      this.loading = true;

      setTimeout(() => {
        this.updateEmployeeSchool(String(this.employee.id), formData)
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
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }
}
</style>
