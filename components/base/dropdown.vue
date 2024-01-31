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
  />

  <small class="dropdown__error">{{ errorMessage }}</small>
</template>
