<template>
  <div class="container fadein animation-duration-500">
    <div class="container__header">
      <h2 class="heading__secondary">
        {{ !showAdjustTable ? "Pontos" : "Ajustes" }}
      </h2>

      <div class="container__header--action">
        <BaseButton
          class="btn__primary"
          icon="pi pi-table"
          :label="showAdjustTable ? 'Ver pontos' : 'Ver ajustes'"
          @click="toggleTable"
        />
      </div>
    </div>

    <EmployeeClocksOverview v-if="showAdjustTable" />
    <EmployeeClocksAdjusts v-else />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showAdjustTable: false,
    };
  },
  methods: {
    toggleTable() {
      this.showAdjustTable = !this.showAdjustTable;
    },
  },
};
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
