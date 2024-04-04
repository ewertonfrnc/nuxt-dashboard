<script lang="ts">
import { mapActions } from "pinia";

export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          field: "name",
          header: "Nome",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "currentBalance",
          header: "Saldo atual",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "totalRequests",
          header: "Ajustes pendentes",
          sortable: false,
          hasFilter: true,
        },
      ],
      nodes: [],
    };
  },
  async mounted() {
    await this.getInitialValues();
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["getPendingAdjustments"]),
    async getInitialValues() {
      this.loading = true;
      try {
        this.nodes = await this.getPendingAdjustments();
      } catch (err) {
        console.log("err", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Ajustes pendentes</h2>

    <BaseTable
      :loading="loading"
      :columns="columns"
      :nodes="nodes"
      header-shown
      is-expandable
    >
      <template #expansion-content="slotProps">
        <TimeSheetTableExpandedRow :slot-props="slotProps.data" />
      </template>
    </BaseTable>
  </div>
</template>

<style scoped lang="scss"></style>
