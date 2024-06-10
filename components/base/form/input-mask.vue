<template>
  <label class="input">
    <span class="caption__primary" v-text="label" />

    <VeeField v-slot="{ field, errorMessage }" :name="name">
      <InputMask
        v-bind="field"
        v-model="field.value"
        :mask="mask"
        :class="['input__field body__primary', errorMessage && 'error']"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        @update:model-value="handleChange"
      />

      <i
        v-if="!readonly && rightIcon"
        :class="`${rightIcon} input__icon-right`"
        @click="handleRightIcon"
      />
    </VeeField>

    <ErrorMessage :name="name" class="caption__secondary input__error" />
  </label>
</template>

<script lang="ts">
export default {
  props: {
    mask: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
    icon: { type: String, default: "", required: false },
    rightIcon: { type: String, default: "", required: false },
  },
  emits: ["handle-change", "right-icon-click"],
  methods: {
    handleRightIcon() {
      this.$emit("right-icon-click");
    },
    handleChange(value: string) {
      this.$emit("handle-change", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input__icon-right {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(20%, 10%);
  color: map-get($color-scheme-light, "$color-brand-primary-0");
}

.dark-mode .input__icon-right {
  color: map-get($color-scheme-dark, "$color-brand-primary-0");
}
</style>
