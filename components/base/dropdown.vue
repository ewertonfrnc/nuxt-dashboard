<template>
  <Dropdown
    v-model="value"
    :readonly="readonly"
    :disabled="disabled"
    :options="options"
    option-label="name"
    :placeholder="placeholder"
    :pt="{
      root: `dropdown`,
      wrapper: 'dropdown__options',
      list: 'dropdown__list',
      input: 'dropdown__input',
      trigger: 'dropdown__trigger',
    }"
    @update:model-value="handleChange"
  >
    <template #value="{ value }">
      <p class="body__primary">{{ value }}</p>
    </template>

    <template #dropdownicon>
      <i class="pi pi-chevron-down caption__primary" />
    </template>

    <template #option="{ option }">
      <span class="body__primary">{{ option }}</span>
    </template>
  </Dropdown>

  <small class="dropdown__error caption__primary">{{
    wrongCrendentialsMessage || errorMessage
  }}</small>
</template>

<script lang="ts">
import { useField } from "vee-validate";

export default {
  props: {
    name: { type: String, default: "", required: true },
    options: { type: Array, default: [], required: true },
    disabled: { type: Boolean, default: false, required: false },
    readonly: { type: Boolean, default: false, required: false },
    wrongCrendentialsMessage: { type: String, default: "", required: false },
    placeholder: {
      type: String,
      default: "Selecione uma opção",
      required: false,
    },
  },
  emits: ["on-change"],
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
  methods: {
    handleChange() {
      this.$emit("on-change");
    },
  },
};
</script>
