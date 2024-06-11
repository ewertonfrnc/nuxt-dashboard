<template>
  <label class="input">
    <span class="caption__primary" v-text="label" />

    <Dropdown
      v-model="value"
      :readonly="readonly"
      :disabled="disabled"
      :options="options"
      option-label="name"
      :placeholder="placeholder"
      :pt="{
        root: `dropdown ${errorMessage && 'dropdown__error'}`,
        wrapper: 'dropdown__wrapper',
        list: 'dropdown__list',
        trigger: 'dropdown__trigger',
      }"
      @update:model-value="handleChange"
    >
      <template #value="{ value, placeholder }">
        <p v-if="value" class="body__primary">
          {{ value }}
        </p>

        <p v-else class="body__primary dropdown__placeholder">
          {{ placeholder }}
        </p>
      </template>

      <template #dropdownicon>
        <i class="pi pi-chevron-down caption__primary" />
      </template>

      <template #option="{ option }">
        <span class="body__primary">{{ option }}</span>
      </template>
    </Dropdown>

    <Transition>
      <small class="caption__secondary input__error">{{ errorMessage }}</small>
    </Transition>
  </label>
</template>

<script lang="ts">
import { useField } from "vee-validate";

export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    disabled: { type: Boolean, default: false, required: false },
    readonly: { type: Boolean, default: false, required: false },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
      required: true,
    },
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
