<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Todos os pontos</h2>

    <section>
      <label class="caption__primary filter__label">
        <span>Data de exibição</span>
        <div class="filter__calendar">
          <BaseDatePicker @date-handler="datePickerHandler" />
        </div>
      </label>

      <BaseTable
        :columns="columns"
        :custom-filters="filters"
        :loading="loading"
        :nodes="nodes"
        :total-pages="totalPages"
        has-action
        header-shown
        @update-filter-handler="getClocks"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <BaseTag
            v-if="field === 'tag'"
            :severity="data[field] === 'check-in' ? 'Success' : 'Danger'"
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
          <span class="heading__quinary" style="max-width: min-content"
            >Ações</span
          >
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            :data="{ slotData }"
            :icon="'pi-user'"
            tooltip-text="Ver detalhes no perfil"
            @action-handler="goToEmployeeDetails"
          />
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { mapActions } from "pinia";
import { AllClocksParams } from "~/interfaces/time-sheet/time-sheet.interface";
import { dateFormatters } from "@/utils/formatters";

export default {
  data() {
    return {
      loading: false,
      date: null,
      columns: [
        {
          field: "hour",
          header: "Horário",
          sortable: true,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "name",
          header: "Nome",
          sortable: false,
          hasFilter: true,
          frozen: true,
        },
        {
          field: "tag",
          header: "Tags",
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
      ],
      nodes: [],
      totalPages: 0,
      currentPage: 1,
      filters: {
        name: {
          field: "name",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        tag: {
          field: "tag",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        department: {
          field: "department",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        hour: {
          field: "hour",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
      queries: {
        page: 1,
        limit: 10,
        date: "",
        global: { value: "", matchMode: "" },
        tag: { value: "", matchMode: "" },
        name: { value: "", matchMode: "" },
        hour: { value: "", matchMode: "" },
        department: { value: "", matchMode: "" },
      },
    };
  },
  async mounted() {
    await this.getClocks(this.queries);
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["fetchAllClocks"]),
    goToEmployeeDetails(data) {
      this.$router.push(`/employees/${data.id}`);
    },
    async datePickerHandler(date: Date) {
      const formattedDate = dateFormatters.formatDate(date);
      this.queries = { ...this.queries, date: formattedDate };
      await this.getClocks(this.queries);
    },
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getClocks(this.queries);
    },
    async getClocks(queryParams: AllClocksParams) {
      this.loading = true;

      try {
        const { results, total } = await this.fetchAllClocks({
          ...this.queries,
          ...queryParams,
        });
        this.nodes = results;
        this.totalPages = total;
      } catch (error) {
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

  &__calendar {
    width: 300px;
  }
}
</style>
