@@ -0,0 +1,46 @@
<template>
  <BaseInlineMessage v-if="showErrorMessage" severity="error" :text="message" />

  <div class="btn-group mt-4">
    <BaseButton
      :disabled="loading"
      :class="[
        'fadein animation-duration-500',
        primaryColors ? 'btn__primary--outlined' : 'btn__danger--outlined',
      ]"
      :icon="showIcons ? 'pi pi-times' : ''"
      label="Cancelar"
      @click="buttonHandler('left')"
    />
    <BaseButton
      :loading="loading"
      :disabled="loading || disabled"
      :class="[
        'fadein animation-duration-500',
        primaryColors ? 'btn__primary' : 'btn__secondary',
      ]"
      :icon="showIcons ? confirmIcon : ''"
      :label="confirmlabel"
      @click="buttonHandler('right')"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    primaryColors: { type: Boolean, default: false, required: false },
    showIcons: { type: Boolean, default: true, required: false },
    disabled: { type: Boolean, default: false, required: false },
    loading: { type: Boolean, default: false, required: true },
    showErrorMessage: { type: Boolean, default: false, required: false },
    message: { type: String, default: "", required: true },
    confirmlabel: { type: String, default: "Salvar", required: false },
    confirmIcon: { type: String, default: "pi pi-save", required: false },
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
