<template>
  <VeeForm
    class="form"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    @submit="handleSubmit"
  >
    <div class="form-container__header">
      <h2 class="heading__secondary">Dados principais</h2>
      <div class="form-container__header--btns">
        <BaseButton
          v-if="!isEditing"
          class="btn__primary"
          icon="pi pi-pencil"
          label="Editar"
          @click="isEditing = true"
        />

        <template v-else>
          <BaseButton
            class="btn__danger--outlined"
            icon="pi pi-times"
            label="Cancelar"
            :disabled="loading"
            @click="cancelEditing"
          />

          <BaseButton
            type="submit"
            class="btn__secondary"
            icon="pi pi-save"
            label="Salvar alterações"
            :loading="loading"
          />
        </template>
      </div>
    </div>

    <div class="form__personal">
      <div class="form__control">
        <BaseFormInputText
          name="fullname"
          label="Nome completo ou social"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Apelido"
          name="nickname"
          :readonly="!isEditing"
        />
      </div>

      <div :class="['form__control', isEditing && 'form__disabled']">
        <BaseFormInputMask
          label="CPF"
          name="cpf"
          mask="999.999.999-99"
          :readonly="!isEditing"
          :disabled="isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="RG"
          name="rg"
          mask="99.999.999-9"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="Data de nascimento"
          name="birthDate"
          mask="99/99/9999"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="Cidade natal"
          name="birthCity"
          :readonly="!isEditing"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Etnia"
          name="ethnicity"
          :readonly="!isEditing"
          :options="ethnicityOptions"
        />
      </div>
    </div>

    <div class="form__control form__control--highlight">
      <BaseFormDropdown
        label="Visualização"
        name="role"
        :readonly="!isEditing"
        :options="visualizeOptions"
      />
    </div>

    <div class="form__additional">
      <div v-if="isEditing" class="form__upload fadein animation-duration-500">
        <span class="body__primary">Foto de perfil</span>
        <BaseUpload @on-upload="handleUpload" />
      </div>

      <div v-else class="fadein animation-duration-500">
        <figure class="form__figure">
          <img
            :src="initialValues.profileImg"
            :alt="`Foto de perfil de ${initialValues.fullname}`"
          />

          <figcaption class="body__primary">Foto de perfil</figcaption>
        </figure>
      </div>
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { GenericObject } from "vee-validate";
import { usePVToast } from "~/composables/usePVToast";
import { EmployeePersonalData } from "~/interfaces/employee/employee.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      isEditing: false,
      visualizeOptions: ["Administrador", "Colaborador"],
      ethnicityOptions: ["Amarelo", "Branco(a)", "Indígena", "Negro", "Pardo"],

      initialValues: {} as EmployeePersonalData,
      formSchema: {
        fullname: "required|min:3",
        birthDate: "required|date",
      },
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  created() {
    this.initialValues = { ...this.employee.personalData };
  },
  methods: {
    ...mapActions(useEmployeeStore, ["updateEmployeeData"]),
    handleUpload() {
      this.employee.personalData.profileImg =
        "https://images.unsplash.com/photo-1487573884658-a5d3c667584e?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    },
    cancelEditing() {
      this.isEditing = false;
    },
    handleSubmit(values: GenericObject) {
      const formData = { ...values } as EmployeePersonalData;

      this.loading = true;

      setTimeout(() => {
        this.updateEmployeeData(String(this.employee.id), formData)
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
  gap: 24px;

  &__personal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;

    @include respond(phone) {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  &__control {
    &--highlight {
      width: 400px;
      padding: 10px;
      border: 1px solid #6e57f5;
      border-radius: 8px;

      @include respond(phone) {
        width: 100%;
      }
    }
  }

  &__disabled {
    transition: all 0.3s;
    color: map-get($color-scheme-light, "$color-neutral-neutral-4");
  }

  &__upload {
    display: grid;
    gap: 24px;
  }

  &__additional {
    margin-top: 24px;
    display: grid;
    gap: 24px;

    @include respond(phone) {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
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
}
</style>
