<template>
  <div class="container fadein animation-duration-500">
    <div class="container__header">
      <h2 class="heading__secondary">Pontos</h2>

      <div class="container__header--action">
        <BaseButton
          class="btn__primary"
          icon="pi pi-table"
          label="Ver ajustes"
        />
      </div>
    </div>

    <EmployeeClocksOverview />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.container {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
}
</style>
