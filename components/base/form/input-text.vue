<template>
  <label class="input">
    <span class="caption__primary" v-text="label" />

    <VeeField v-slot="{ field, errorMessage }" :name="name">
      <InputText
        v-bind="field"
        v-model="field.value"
        :class="['input__field body__primary', errorMessage && 'error']"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
      />
    </VeeField>

    <Transition>
      <ErrorMessage :name="name" class="caption__secondary input__error" />
    </Transition>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    name: { type: String, default: "", required: true },
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    readonly: { type: Boolean, default: false, required: false },
    disabled: { type: Boolean, default: false, required: false },
  },
};
</script>
