<template>
  <Checkbox
    v-model="checkedValue"
    :binary="true"
    :pt="{
      root: ({ context }) => {
        return `checkbox ${context.checked && 'checkbox--checked'}`;
      },
      input: 'checkbox__input',
      icon: 'checkbox__icon',
    }"
    @click="toggleChecked"
  />
</template>

<script lang="ts">
export default {
  props: {
    checked: { type: Boolean, default: false, required: true },
  },
  emits: ["checkbox-value"],
  data() {
    return {
      checkedValue: this.checked,
    };
  },
  updated() {
    this.checkedValue = this.checked;
  },
  methods: {
    toggleChecked() {
      this.checkedValue = !this.checkedValue;
      this.$emit("checkbox-value", this.checkedValue);
    },
  },
};
</script>
