<template>
  <VeeField :name="name">
    <div class="input">
      <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

      <InputMask
        v-model="value"
        :auto-clear="false"
        :class="[
          'input__field body__primary',
          (errorMessage || wrongCrendentialsMessage) && 'error',
        ]"
        :disabled="disabled"
        :mask="mask"
        :placeholder="placeholder"
        :readonly="readonly"
        @update:model-value="handleChange"
      />
    </div>
  </VeeField>

  <small class="input__error">{{
    wrongCrendentialsMessage || errorMessage
  }}</small>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { validateCPF } from "~/utils/validators";

export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    mask: { type: String, required: true, default: "(99) 99999-9999" },
    placeholder: { type: String, default: "", required: false },
    icon: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
    wrongCrendentialsMessage: { type: String, default: "", required: false },
  },
  emits: ["handle-change"],
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
  methods: {
    handleChange(value: string) {
      this.$emit("handle-change", !validateCPF(value) ? "CPF inválido!" : "");
    },
  },
};
</script>
