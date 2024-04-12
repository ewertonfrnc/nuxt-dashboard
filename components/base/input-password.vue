<template>
  <div class="input">
    <i v-if="!readonly && icon" :class="`${icon} input__icon`" />

    <Password
      v-model="value"
      :icon="icon"
      :feedback="false"
      :disabled="disabled"
      :placeholder="placeholder"
      toggle-mask
      :pt="{
        root: 'input',
        input: {
          class: `input__field ${
            (errorMessage || wrongCrendentialsMessage) && 'error'
          }`,
          readonly,
        },
      }"
      @update:model-value="(value: string) => $emit('updatedValue', value)"
    >
      <template #hideicon="{ toggleCallback, onClick }">
        <div class="input__icon--password" @click="onClick">
          <i class="pi pi-eye" />
        </div>
      </template>
      <template #showicon="{ toggleCallback, onClick }">
        <div class="input__icon--password" @click="onClick">
          <i class="pi pi-eye-slash" />
        </div>
      </template>
    </Password>

    <!--    <div-->
    <!--      class="input__icon&#45;&#45;password"-->
    <!--      @click.prevent="togglePasswordVisibility"-->
    <!--    >-->
    <!--      <i v-if="!isPasswordVisible" class="pi pi-eye-slash" />-->
    <!--      <i v-else class="pi pi-eye" />-->
    <!--    </div>-->
  </div>

  <small class="input__error">{{
    wrongCrendentialsMessage || errorMessage
  }}</small>
</template>

<script lang="ts">
import { useField } from "vee-validate";

export default {
  emit: ["updatedValue"],
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    icon: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
    wrongCrendentialsMessage: { type: String, default: "", required: false },
  },
  emits: ["updatedValue"],
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

      const closedEyeIcons = document.querySelectorAll(".pi-eye-slash");
      const openEyeIcons = document.querySelectorAll(".pi-eye");
      const inputEls = document.querySelectorAll(
        '[data-pc-name="password"] > .input__field',
      );

      if (this.isPasswordVisible) {
        closedEyeIcons.forEach((el) => {
          el.classList.replace("pi-eye-slash", "pi-eye");
        });
      } else {
        openEyeIcons.forEach((el) => {
          el.classList.replace("pi-eye", "pi-eye-slash");
        });
      }

      inputEls.forEach((el) => {
        el.type = this.isPasswordVisible ? "text" : "password";
      });
    },
  },
};
</script>
