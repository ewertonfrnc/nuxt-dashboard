<template>
  <div class="input">
    <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

    <Password
      v-model="value"
      :icon="icon"
      :feedback="false"
      :disabled="disabled"
      :placeholder="placeholder"
      :pt="{ input: { class: 'input__field', readonly } }"
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
