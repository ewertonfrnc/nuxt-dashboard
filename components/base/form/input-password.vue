<template>
  <label class="input">
    <span class="caption__primary" v-text="label" />

    <VeeField v-slot="{ field, errorMessage }" :name="name">
      <Password
        v-bind="field"
        v-model="field.value"
        toggle-mask
        :feedback="false"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        :pt="{
          root: 'input',
          input: {
            class: `input__field body__primary ${errorMessage && 'error'}`,
            readonly,
          },
        }"
        @update:model-value="handleInputChange"
      >
        <template #hideicon="{ onClick }">
          <div class="input__icon--password" @click="onClick">
            <i class="pi pi-eye" />
          </div>
        </template>
        <template #showicon="{ onClick }">
          <div class="input__icon--password" @click="onClick">
            <i class="pi pi-eye-slash" />
          </div>
        </template>
      </Password>
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
  emits: ["updated-value"],
  methods: {
    handleInputChange(value: string) {
      this.$emit("updated-value", value);
    },
  },
};
</script>
