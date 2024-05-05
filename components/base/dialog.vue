<template>
  <Dialog
    :draggable="false"
    :maximizable="true"
    :pt="{
      root: `dialog ${matchScreenSize && 'p-dialog-maximized'}`,
      content: 'overflow-hidden',
      mask: 'dialog__mask fadein',
      closeButton: 'dialog__close-btn',
      header: 'dialog__header',
      maximizableButton: 'hidden',
      // footer: 'dialog__footer',
    }"
    :visible="isVisible"
    close-on-escape
    modal
  >
    <template #header>
      <h4 class="heading__quaternary">{{ title }}</h4>
    </template>

    <template #closeicon>
      <i class="pi pi-times close-icon" @click="toggleDialog"></i>
    </template>

    <template #default>
      <slot />
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    isVisible: { type: Boolean, default: false, required: true },
    toggleDialog: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
    title: { type: String, default: "", required: true },
  },
  emits: ["save"],
  setup() {
    const { matchScreenSize } = useWindow("modal");
    return { matchScreenSize };
  },
  methods: {
    onSave() {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 2rem;
}

.close-icon {
  font-size: 15px;
}
</style>
