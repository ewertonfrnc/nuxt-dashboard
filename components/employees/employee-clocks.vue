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
            @action-handler="handleClockDialog"
          />
        </template>
      </BaseTable>
    </section>

    <BaseDialog
      :is-visible="isVisible"
      :toggle-dialog="toggleVisibility"
      title="Pontos"
    >
      <div class="clocks">
        <div class="clocks__header">
          <div class="clocks__date">
            <span class="caption__primary">Data:</span>
            <span class="body__secondary">02/05/2024</span>
          </div>

          <BaseButton class="btn__primary" icon="pi pi-pencil" label="Editar" />
        </div>

        <div class="clocks__content">
          <SharedHoursView
            :requests="selectedClock.requests"
            :show-total="false"
          />
        </div>
      </div>

      <template #footer>
        <BaseButton
          class="btn__primary--outlined"
          icon="pi pi-times"
          label="Fechar"
          @click="toggleVisibility"
        />
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import {
  EmployeeClocks,
  EmployeeQueryParams,
} from "~/interfaces/employee/employee.interface";

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
        limit: 2,
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

      // Dialog
      selectedClock: {} as EmployeeClocks,
    };
  },
  async created() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useEmployeeStore, ["getRegisteredClocks"]),
    handleClockDialog(data: EmployeeClocks) {
      this.toggleVisibility();
      this.selectedClock = data;
    },
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: EmployeeQueryParams) {
      this.loading = true;
      try {
        const { clocks, total } = await this.getRegisteredClocks(
          String(this.$route.params.id),
          queryParams,
        );

        this.nodes = clocks;
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
h2 {
  margin-bottom: 2rem;
}

.clocks {
  width: 40rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      max-width: 115px;
    }
  }

  &__date {
    display: flex;
    flex-direction: column;
    gap: 8px;

    span:nth-child(2) {
      color: map-get($color-scheme-light, "$color-neutral-neutral-2");
    }
  }
}
</style>
