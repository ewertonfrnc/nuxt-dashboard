<template>
  <Toast />

  <div class="container text-left">
    <BaseCard>
      <h1 class="heading-primary">Oops!</h1>
      <p class="paragraph">Não tem nada aqui 🫣</p>

      <BaseButton
        class="btn__secondary"
        label="Voltar à página inicial"
        @click="handleClearError"
      />

      <div class="text-left">
        <p>URL: {{ error?.url }}</p>
        <p>Status Code: {{ error?.statusCode }}</p>
        <p>Status Message: {{ error?.statusMessage }}</p>
        <p>Message: {{ error?.message }}</p>
        <p>Description: {{ error?.description }}</p>
        <p>Data: {{ error?.data }}</p>
      </div>
    </BaseCard>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    error: Object,
  },
  methods: {
    handleClearError() {
      this.$toast.add({
        severity: "info",
        detail: "Example",
        summary: "Example test",
        life: 3000,
      });
      clearError({ redirect: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;
  height: 100vh;
  width: 100vw;

  display: grid;
  place-content: center;
  text-align: center;
  gap: 1rem;
}
</style>
