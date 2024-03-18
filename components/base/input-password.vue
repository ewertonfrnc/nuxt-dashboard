<template>
  <div class="input">
    <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

    <Password
      v-model="value"
      :icon="icon"
      :feedback="false"
      :disabled="disabled"
      :placeholder="placeholder"
      :pt="{
        input: { class: `input__field ${errorMessage && 'error'}`, readonly },
        hideIcon: 'pi pi-eye',
        showIcon: 'pi pi-eye-slash',
      }"
    />

    <div
      class="input__icon--password"
      @click.prevent="togglePasswordVisibility"
    >
      <i v-if="!isPasswordVisible" class="pi pi-eye-slash" />
      <i v-else class="pi pi-eye" />
    </div>
  </div>

  <small class="input__error">{{
    wrongCrendentialsMessage || errorMessage
  }}</small>
</template>

<script lang="ts">
import { useField } from "vee-validate";

export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    icon: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
    wrongCrendentialsMessage: { type: String, default: "", required: false },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    return { value, errorMessage };
  },
  data() {
    return {
      isPasswordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;

      const inputEl: HTMLInputElement | null = document.querySelector(
        '[data-pc-name="password"] > .input__field',
      );

      if (inputEl) {
        inputEl.type = this.isPasswordVisible ? "text" : "password";
      }
    },
  },
};
</script>
