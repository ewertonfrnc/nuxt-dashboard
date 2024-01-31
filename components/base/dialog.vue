<template>
  <Dialog
    :visible="isVisible"
    modal
    :draggable="false"
    :style="{ width: '40vw' }"
    close-on-escape
    :pt="{
      root: 'dialog',
      mask: 'dialog__mask fadein',
    }"
  >
    <template #container>
      <slot />
    </template>
  </Dialog>
</template>

<script lang="ts">
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    toggleDialog: {
      type: Function,
      required: true,
    },
  },
};
</script>
