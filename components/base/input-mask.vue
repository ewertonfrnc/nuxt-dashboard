<template>
  <div class="input">
    <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

    <InputMask
      v-model="value"
      :mask="mask"
      :auto-clear="false"
      :disabled="disabled"
      :readonly="readonly"
      class="input__field"
      :placeholder="placeholder"
    />
  </div>

  <small class="input__error">{{ errorMessage }}</small>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    mask: { type: String, required: true, default: "(99) 99999-9999" },
    placeholder: { type: String, default: "", required: false },
    icon: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
};
</script>
