<template>
  <VeeForm
    class="form"
    :validation-schema="schema"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <p class="body__secondary">
      Insira os dados do colaborador para que seja adicionado no cadastro em
      lote.
    </p>

    <h4 class="subtitle__primary">Dados principais</h4>

    <div class="form__personal">
      <div class="form__control">
        <BaseFormInputText
          label="Nome completo ou Social"
          name="name"
          placeholder="Insira o nome completo"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="RG"
          name="rg"
          mask="999.999.999"
          placeholder="Insira o RG"
        />
      </div>

      <div class="form__control">
        <BaseFormInputText
          label="E-mail"
          name="email"
          placeholder="Insira o nome completo"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="CPF"
          name="cpf"
          mask="999.999.999-99"
          placeholder="Insira o CPF"
        />
      </div>

      <div class="form__control">
        <BaseFormInputMask
          label="Telefone"
          name="phone"
          mask="(99) 99999-9999"
          placeholder="Insira o telefone"
        />
      </div>
    </div>

    <h4 class="subtitle__primary">Dados profissionais</h4>

    <div class="form__profissional">
      <div class="form__control">
        <BaseFormDropdown
          label="Modelo de contratação"
          name="workRegime"
          :options="workRegimeOptions"
          placeholder="Insira o cargo"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Modelo de trabalho"
          name="workType"
          :options="workTypeOptions"
          placeholder="Insira o cargo"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Cargo"
          name="role"
          :options="roleOptions"
          placeholder="Insira o cargo"
        />
      </div>

      <div class="form__control">
        <BaseFormDropdown
          label="Departamento"
          name="department"
          :options="departmentOptions"
          placeholder="Insira o cargo"
        />
      </div>
    </div>

    <div class="form__btn-group">
      <BaseButton
        class="btn__primary--outlined"
        icon="pi pi-times"
        label="Cancelar"
        :disabled="loading"
        @click="resetAddEditForm"
      />

      <BaseButton
        type="submit"
        class="btn__primary"
        icon="pi pi-plus"
        label="Adicionar"
        :loading="loading"
      />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import { mapActions } from "pinia";
import { GenericObject } from "vee-validate";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";

export default {
  props: {
    loading: { type: Boolean, default: false, required: true },
    toggleDialog: { type: Function, required: true },
    csvArray: {
      type: Array as PropType<RegisterEmployee[]>,
      default: () => [],
      required: false,
    },
    selectedEmployee: {
      type: Object as PropType<RegisterEmployee | {}>,
      default: () => ({}),
      required: false,
    },
  },
  emits: ["submit"],
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      roleOptions: [],
      departmentOptions: [],
      workRegimeOptions: [],
      workTypeOptions: [],
      initialValues: {} as RegisterEmployee | {},
      nodes: [] as RegisterEmployee[],

      schema: {
        name: "required|min:3|max:255|alpha_spaces",
        email: "required|min:10|max:50|email",
        cpf: "required|cpf",
        phone: "required|min:15|phone",
        department: "required|max:255|alpha_spaces",
        role: "required|max:255|alpha_spaces",
        workRegime: "required|max:255|alpha_spaces",
        workType: "required|max:255|alpha_spaces",
      },
    };
  },
  created() {
    this.nodes = this.csvArray;
    this.initialValues = this.selectedEmployee;
    this.getFormOptions();
  },
  unmounted() {
    this.initialValues = {};
  },
  methods: {
    ...mapActions(useRegisterEmployeesStore, ["fetchWorkOptions"]),
    getFormOptions(): void {
      this.fetchWorkOptions()
        .then((options) => {
          this.roleOptions = options.roleOptions;
          this.departmentOptions = options.departmentOptions;
          this.workRegimeOptions = options.workRegimeOptions;
          this.workTypeOptions = options.workTypeOptions;
        })
        .catch(() => this.getToast("error"));
    },
    resetAddEditForm(): void {
      this.initialValues = {};
      this.toggleDialog();
    },
    onSubmit(values: GenericObject) {
      this.$emit("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 80vw;
  display: grid;
  gap: 24px;
  padding-bottom: 10px;

  @include respond(tab-port) {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
  }

  &__personal {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
    gap: 24px;
  }

  &__profissional {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
    gap: 24px;
  }

  &__control {
    width: 343px;

    @include respond(tab-port) {
      width: 100%;
    }
  }

  &__btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    button {
      width: max-content;
    }
  }
}
</style>
