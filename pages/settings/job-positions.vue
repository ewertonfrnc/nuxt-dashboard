<template>
  <BaseCard>
    <div class="container">
      <div class="container__header">
        <h2 class="heading__secondary">Cargos</h2>

        <div>
          <BaseButton
            class="btn__primary"
            icon="pi pi-plus"
            label="Cadastrar cargo"
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
          <span class="body__primary">
            {{ data[field] }}
          </span>
        </template>

        <template #column-header>
          <span class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            class="mr-4"
            icon="pi-pencil"
            tooltip-text="Ver detalhes do dia"
            :data="{ slotData }"
            @action-handler="logSelectedItem"
          />

          <BaseTableAction
            icon="pi-trash"
            tooltip-text="Ver detalhes do dia"
            :data="{ slotData }"
            @action-handler="logSelectedItem"
          />
        </template>
      </BaseTable>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { mapActions, mapState } from "pinia";
import { useJobPositionStore } from "~/stores/settings/job-position.store";
import {
  JobPosition,
  QueryJobPositions,
} from "~/interfaces/settings/job-position.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    const { isVisible, toggleVisibility } = useToggle();
    return { isVisible, toggleVisibility, getToast };
  },
  data() {
    return {
      loading: false,
      totalPages: 0,
      currentPage: 1,
      columns: [
        {
          field: "role",
          header: "Cargo",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "employeesCount",
          header: "Colaboradores",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "cbo",
          header: "CBO",
          sortable: false,
          hasFilter: false,
        },
      ],
      nodes: [],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        role: { value: "", matchMode: "" },
        employeesCount: { value: "", matchMode: "" },
        cbo: { value: "", matchMode: "" },
      },
      filters: {
        role: {
          field: "role",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        employeesCount: {
          field: "employeesCount",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        cbo: {
          field: "cbo",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
    };
  },
  computed: {
    ...mapState(useJobPositionStore, ["total", "roles"]),
  },
  created() {
    this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useJobPositionStore, ["getCompanyInfo"]),
    logSelectedItem(data: JobPosition) {
      this.toggleVisibility();
      console.log(data);
      // this.selected = data;
    },
    changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      this.getTableValues(this.queries);
    },
    getTableValues(queryParams: QueryJobPositions) {
      this.loading = true;

      this.getCompanyInfo(queryParams)
        .then(() => {
          this.nodes = this.roles;
          this.totalPages = this.total;
        })
        .catch(() => this.getToast("error"));

      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
