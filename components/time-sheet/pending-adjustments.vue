<script lang="ts">
import { mapActions } from "pinia";
import { QueryParams } from "~/interfaces/time-sheet/time-sheet.interface";
import { Filter } from "~/interfaces/table.interface";

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
      queries: {
        global: { value: "", matchMode: "" },
        name: { value: "2", matchMode: "" },
        currentBalance: { value: "", matchMode: "" },
        totalRequests: { value: "3", matchMode: "" },
      },
    };
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["getPendingAdjustments"]),
    arrayToObject(array: Filter[]) {
      return array.reduce((accumulator, currentValue) => {
        const { field, value, matchMode } = currentValue;
        return Object.assign(accumulator, { [field]: { value, matchMode } });
      }, {});
    },
    async getTableValues(queryParams: QueryParams) {
      const queryParamsArray = Object.values(queryParams);
      this.queries = this.arrayToObject(queryParamsArray);

      this.loading = true;
      try {
        this.nodes = await this.getPendingAdjustments(this.queries);
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado!",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
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
      @update-filter-handler="getTableValues"
    >
      <template #expansion-content="slotProps">
        <TimeSheetTableExpandedRow :slot-props="slotProps.data" />
      </template>
    </BaseTable>
  </div>
</template>

<style scoped lang="scss"></style>
