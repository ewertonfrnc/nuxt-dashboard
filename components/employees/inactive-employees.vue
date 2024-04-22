<template>
  <div class="container fadein animation-duration-500">
    <h2 class="heading__secondary">Desativados</h2>

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
          <BaseTableAction
            :data="{ slotData }"
            :icon="'pi-user-plus'"
            tooltip-text="Reativar colaborador"
            @action-handler="reactivateEmployee"
          />
        </template>
      </BaseTable>
    </section>

    <BaseDialog
      :is-visible="isVisible"
      :toggle-dialog="toggleVisibility"
      title="Reativar colaborador"
      @save=""
    >
      <EmployeesReactivateDialog :user="selectedEmployee.name" />
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { mapActions } from "pinia";
import {
  Employees,
  InactiveEmployeeQueryParams,
} from "~/interfaces/employees/employees.interface";

export default {
  setup() {
    const { isVisible, toggleVisibility } = useToggle();
    return { isVisible, toggleVisibility };
  },
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
          frozen: true,
        },
        {
          field: "lastRole",
          header: "Antigo cargo",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "hireDate",
          header: "Data da contratação",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "dismissalDate",
          header: "Data do desligamento",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "workType",
          header: "Modelo de contrato",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
      ],
      nodes: [],
      queries: {} as InactiveEmployeeQueryParams,
      filters: {
        name: {
          field: "name",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        lastRole: {
          field: "lastRole",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        hireDate: {
          field: "hireDate",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        dismissalDate: {
          field: "dismissalDate",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        workType: {
          field: "workType",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
      selectedEmployee: {} as Employees,
    };
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useEmployeesStore, ["getInactiveEmployees"]),
    reactivateEmployee(data: Employees) {
      this.toggleVisibility();
      this.selectedEmployee = data;
    },
    async changePageHandler(currentPage: PageState) {
      this.currentPage = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queries: InactiveEmployeeQueryParams) {
      this.loading = true;
      try {
        const { employees, total } = await this.getInactiveEmployees(queries);
        this.nodes = employees;
        this.totalPages = total;
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
