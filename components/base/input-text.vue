<template>
  <div class="input">
    <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

    <InputText
      v-model="value"
      :icon="icon"
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
