<script lang="ts">
export default {
  props: {
    options: { type: Array, required: true, default: () => [] },
    onUpdateHandler: { type: Function, required: true },
  },
  data() {
    return {
      selectedItem: null,
    };
  },
};
</script>

<template>
  <Listbox
    v-model="selectedItem"
    :options="options"
    option-label="label"
    :pt="{
      item: ({ context }) => ({
        class: context.selected
          ? 'listbox__item listbox__item--selected'
          : context.focused
          ? 'listbox__item listbox__item--selected'
          : 'listbox__item',
      }),
    }"
    @update:model-value="onUpdateHandler"
  />
</template>
