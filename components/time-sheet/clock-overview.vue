<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Todos os pontos</h2>

    <section>
      <label class="caption__primary filter__label">
        <span>Data de exibição</span>
        <BaseDatePicker />
      </label>

      <BaseTable
        :loading="loading"
        :columns="columns"
        :nodes="nodes"
        header-shown
      />
    </section>
  </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";

export default {
  data() {
    return {
      date: null,

      // table
      loading: false,
      columns: [
        {
          field: "hour",
          header: "Horário",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "name",
          header: "Nome",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "tag",
          header: "Tags",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "department",
          header: "Departamento",
          sortable: false,
          hasFilter: true,
        },
      ],
      nodes: [],
    };
  },
  async mounted() {
    await this.getClocks();
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["fetchAllClocks"]),
    async getClocks() {
      this.loading = true;

      try {
        this.nodes = await this.fetchAllClocks();
      } catch (error) {
        console.log("error", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  margin-top: 2rem;
}

.filter {
  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
}
</style>
