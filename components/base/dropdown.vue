<script lang="ts">
import { useField } from "vee-validate";

export default {
  props: {
    name: { type: String, default: "", required: true },
    options: { type: Array, default: [], required: true },
    disabled: { type: Boolean, default: false, required: false },
    readonly: { type: Boolean, default: false, required: false },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
};
</script>

<template>
  <Dropdown
    v-model="value"
    :readonly="readonly"
    :disabled="disabled"
    :options="options"
    option-label="name"
    placeholder="Selecione uma opção"
    :pt="{
      root: 'dropdown',
      wrapper: 'dropdown__options',
      list: 'dropdown__list',
      input: 'dropdown__input',
      trigger: 'dropdown__trigger',
    }"
  >
    <template #value="{ value }">
      <p class="body__primary">{{ value }}</p>
    </template>

    <template #dropdownicon>
      <i class="pi pi-chevron-down caption__primary" />
    </template>

    <template #option="{ option }">{{ option }}</template>
  </Dropdown>

  <small class="dropdown__error">{{ errorMessage }}</small>
</template>
