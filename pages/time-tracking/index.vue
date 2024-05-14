<template>
  <BaseCard>
    <h1 class="heading__secondary">Fechamento de ponto</h1>

    <section class="container">
      <div class="container__header">
        <h2 class="heading__secondary">Em aberto</h2>

        <div class="container__header--cta">
          <BaseButton
            class="btn__primary"
            icon="pi pi-plus"
            label="Novo fechamento"
            @click="$router.push('time-tracking/new')"
          />
        </div>
      </div>

      <BaseTable
        :columns="columns"
        :custom-filters="filters"
        :loading="loading"
        :nodes="nodes"
        :total-pages="totalPages"
        has-action
        header-shown
        @update-filter-handler="getTableValues"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <BaseTag
            v-if="field === 'status'"
            :severity="
              data[field] === 'Em andamento'
                ? 'Warning'
                : data[field] === 'Concluído'
                ? 'Success'
                : data[field] === 'Cancelado'
                ? 'Danger'
                : 'Primary'
            "
            :value="data[field]"
          />

          <span v-else class="body__primary">
            {{ data[field] }}
          </span>
        </template>

        <template #column-header>
          <span class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            :data="{ slotData }"
            :icon="'pi-search'"
            tooltip-text="Ver detalhes do dia"
            @action-handler="goToClockClosingDetails"
          /> </template
      ></BaseTable>
    </section>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import {
  QueryOpenClockClosings,
  ClockClosing,
} from "~/interfaces/time-tracking/time-tracking.interface";
import { useTimeTrackingStore } from "~/stores/time-tracking.store";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
  },
  data() {
    return {
      loading: false,
      totalPages: 0,
      currentPage: 1,
      columns: [
        {
          field: "id",
          header: "Identificador",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "period",
          header: "Período",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "employeesCount",
          header: "Nº de colaboradores",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "status",
          header: "Status",
          sortable: false,
          hasFilter: true,
        },
      ],
      nodes: [],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        id: { value: "", matchMode: "" },
        period: { value: "", matchMode: "" },
        employeesCount: { value: "", matchMode: "" },
        status: { value: "", matchMode: "" },
      },
      filters: {
        id: {
          field: "id",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        period: {
          field: "period",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        employeesCount: {
          field: "employeesCount",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        status: {
          field: "status",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
    };
  },
  computed: { ...mapState(useTimeTrackingStore, ["total", "clocks"]) },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useTimeTrackingStore, ["getOpenClockClosing"]),
    goToClockClosingDetails(data: ClockClosing) {
      this.$router.push(`/time-tracking/${data.id}`);
    },
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: QueryOpenClockClosings) {
      this.loading = true;
      try {
        await this.getOpenClockClosing(queryParams);

        this.nodes = this.clocks;
        this.totalPages = this.total;
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 0;
  }
}
</style>
