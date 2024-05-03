<template>
  <div class="fadein animation-duration-500">
    <section>
      <BaseTable
        :columns="columns"
        :custom-filters="filters"
        :loading="tableLoading"
        :nodes="nodes"
        :total-pages="totalPages"
        has-action
        header-shown
        @update-filter-handler="getTableValues"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <BaseTag
            v-if="field === 'dayStatus'"
            :severity="
              data[field] === 'Ajuste pendente'
                ? 'Warning'
                : data[field] === 'Em andamento'
                ? 'Secondary'
                : data[field] === 'Falta check-out'
                ? 'Danger'
                : 'Primary'
            "
            :value="data[field]"
          />

          <span
            v-else
            :class="[
              'body__primary',
              field === 'currentBalance' && data.negative && 'negative',
              field === 'currentBalance' && !data.negative && 'positive',
            ]"
          >
            {{ data[field] || "--:--:--" }}
          </span>
        </template>

        <template #column-header>
          <span class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            :data="{ slotData }"
            :icon="'pi-list'"
            tooltip-text="Ver detalhes do dia"
            @action-handler="() => {}"
          />
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import {
  AdjustQueryParams,
  EmployeeAdjusts,
} from "~/interfaces/employee/employee.interface";

export default {
  data() {
    return {
      tableLoading: false,
      totalPages: 0,
      currentPage: 1,
      columns: [
        {
          field: "dateToAdjust",
          header: "Data a ser ajustada",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "requestDate",
          header: "Data da solicitação",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "status",
          header: "Status",
          sortable: false,
          hasFilter: false,
        },
      ],
      nodes: [] as EmployeeAdjusts[],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        dateToAdjust: { value: "", matchMode: "" },
        requestDate: { value: "", matchMode: "" },
        status: { value: "", matchMode: "" },
      },
      filters: {
        dateToAdjust: {
          field: "dateToAdjust",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        requestDate: {
          field: "requestDate",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        status: {
          field: "status",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },

      // Dialog
      dialogLoading: false,
      selectedClock: {},
      isEditing: false,
      hasChanges: false,
      showErrorMessage: false,
      cancelRequest: false,
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["adjusts", "total"]),
  },
  async created() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useEmployeeStore, ["getDatesToAdjust"]),
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: AdjustQueryParams) {
      this.tableLoading = true;
      try {
        await this.getDatesToAdjust(String(this.$route.params.id), queryParams);
        this.nodes = this.adjusts;
        this.totalPages = this.total;
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado!",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      } finally {
        this.tableLoading = false;
      }
    },
  },
};
</script>
