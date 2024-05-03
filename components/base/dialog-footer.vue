@@ -0,0 +1,46 @@
<template>
  <BaseInlineMessage v-if="showErrorMessage" severity="error" :text="message" />

  <div class="btn-group mt-4">
    <BaseButton
      :disabled="loading"
      class="btn__danger--outlined fadein animation-duration-500"
      icon="pi pi-times"
      label="Cancelar"
      @click="buttonHandler('left')"
    />
    <BaseButton
      :loading="loading"
      :disabled="loading"
      class="btn__secondary fadein animation-duration-500"
      icon="pi pi-save"
      label="Salvar"
      @click="buttonHandler('right')"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    loading: { type: Boolean, default: false, required: true },
    showErrorMessage: { type: Boolean, default: false, required: false },
    message: { type: String, default: "", required: true },
  },
  emits: ["click-handler"],
  methods: {
    buttonHandler(button: "left" | "right") {
      if (button === "left") {
        this.$emit("click-handler", "cancel");
      } else {
        this.$emit("click-handler", "confirm");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.btn-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  button {
    width: max-content;
  }
}
</style>
