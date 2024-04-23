<template>
  <div class="container fadein animation-duration-500">
    <h2 class="heading__secondary">Pontos</h2>

    <section>
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
            :severity="data[field] === 'Trabalhando' ? 'Success' : 'Warning'"
            :value="data[field]"
          />

          <span
            v-else
            :class="['body__primary', field === 'totalRequests' && 'highlight']"
          >
            {{ data[field] }}
          </span>
        </template>

        <template #column-header>
          <span class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            :data="{ slotData }"
            :icon="'pi-user'"
            tooltip-text="Acessar perfil"
          />
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";

export default {
  data() {
    return {
      loading: false,
      totalPages: 0,
      currentPage: 1,
      columns: [
        {
          field: "date",
          header: "Data",
          sortable: true,
          hasFilter: true,
          frozen: true,
        },
        {
          field: "currentBalance",
          header: "Saldo do dia",
          sortable: false,
          hasFilter: true,
          frozen: true,
        },
        {
          field: "firstCheckIn",
          header: "Primeiro check-in",
          sortable: true,
          hasFilter: true,
          frozen: true,
        },
        {
          field: "lastCheckOut",
          header: "Último check-out",
          sortable: true,
          hasFilter: true,
          frozen: true,
        },
        {
          field: "dayStatus",
          header: "Status do dia",
          sortable: false,
          hasFilter: true,
          frozen: true,
        },
      ],
      nodes: [],
      queries: {
        page: 1,
        global: { value: "", matchMode: "" },
        date: { value: "", matchMode: "" },
        currentBalance: { value: "", matchMode: "" },
        firstCheckIn: { value: "", matchMode: "" },
        lastCheckOut: { value: "", matchMode: "" },
        dayStatus: { value: "", matchMode: "" },
      },
      filters: {
        date: {
          field: "date",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        currentBalance: {
          field: "currentBalance",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        firstCheckIn: {
          field: "firstCheckIn",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        lastCheckOut: {
          field: "lastCheckOut",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        dayStatus: {
          field: "dayStatus",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
    };
  },
  methods: {
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    getTableValues() {},
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 2rem;
}
</style>
