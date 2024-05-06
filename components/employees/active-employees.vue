<template>
  <div class="container fadein animation-duration-500">
    <h2 class="heading__secondary">Colaboradores ativos</h2>

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
            @action-handler="goToEmployeeDetails"
          />
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { PageState } from "primevue/paginator";
import { FilterMatchMode } from "primevue/api";
import {
  QueryParams,
  Employees,
} from "~/interfaces/employees/employees.interface";

export default {
  data() {
    return {
      loading: false,
      totalPages: 0,
      currentPage: 1,
      columns: [
        {
          field: "name",
          header: "Nome",
          sortable: true,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "role",
          header: "Cargo",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "department",
          header: "Departamento",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "workType",
          header: "Modelo de trabalho",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "status",
          header: "Status",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
      ],
      nodes: [] as Employees[],
      queries: {} as QueryParams,
      filters: {
        name: {
          field: "name",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        role: {
          field: "role",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        department: {
          field: "department",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        workType: {
          field: "workType",
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
  computed: {
    ...mapState(useEmployeesStore, ["employees", "total"]),
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useEmployeesStore, ["getActiveEmployees"]),
    goToEmployeeDetails(data: Employees) {
      this.$router.push(`/employees/${data.id}`);
    },
    async changePageHandler(currentPage: PageState) {
      this.currentPage = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queries: ActiveEmployeeQueryParams) {
      this.loading = true;
      try {
        await this.getActiveEmployees(queries);
        this.nodes = this.employees;
        this.totalPages = this.total;
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

<style lang="scss" scoped>
.container h2 {
  margin: 2rem 0;
}
</style>
