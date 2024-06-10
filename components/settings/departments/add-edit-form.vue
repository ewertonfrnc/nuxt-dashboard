<template>
  <VeeForm
    class="form"
    :initial-values="initialValues"
    :validation-schema="formSchema"
    @submit="onSubmit"
  >
    <p class="body__secondary">Insira o nome do departamento a ser criado</p>

    <div class="form__control">
      <BaseFormInputText
        label="Nome do departamento"
        name="department"
        placeholder="Insira o nome do departamento"
      />
    </div>

    <div class="form__btn-group">
      <BaseButton
        class="btn__primary--outlined"
        label="Cancelar"
        :disabled="loading"
        @click="cancelSubmit"
      />
      <BaseButton
        type="submit"
        class="btn__primary"
        label="Cadastrar"
        :loading="loading"
      />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { GenericObject } from "vee-validate";

export default {
  props: {
    loading: { type: Boolean, default: false, required: false },
    selectedItem: { type: Object, default: () => ({}), required: false },
  },
  emits: ["submit", "cancel-submit"],
  data() {
    return {
      initialValues: {},
      formSchema: {
        department: "required|min:3|max:255",
      },
    };
  },
  created() {
    this.initialValues = {
      department: this.selectedItem.department,
    };
  },
  methods: {
    onSubmit(values: GenericObject) {
      this.$emit("submit", values);
    },
    cancelSubmit() {
      this.$emit("cancel-submit");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 800px;
  display: grid;
  gap: 24px;

  &__btn-group {
    justify-self: flex-end;

    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
}
</style>
