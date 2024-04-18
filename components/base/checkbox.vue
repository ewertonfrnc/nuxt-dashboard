<template>
  <Checkbox
    v-model="checked"
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
  emits: ["checkbox-value"],
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked;
      this.$emit("checkbox-value", this.checked);
    },
  },
};
</script>
