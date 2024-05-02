<template>
  <div class="container fadein animation-duration-500">
    <h2 class="heading__secondary">Pontos</h2>

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

          <Transition>
            <BaseButton
              v-if="!isEditing"
              class="btn__primary"
              icon="pi pi-pencil"
              label="Editar"
              @click="isEditing = true"
            />
          </Transition>
        </div>

        <EmployeesAdjustClocksForm
          :selected-clock="selectedClock"
          :is-editing="isEditing"
          :loading="dialogLoading"
          :has-changes="hasChanges"
          :show-error-message="showErrorMessage"
          :handle-cancel="handleCancelEditing"
          :handle-save="handleSaveEditing"
          @handle-change="handleChange"
        />
      </div>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { DateTime } from "luxon";
import {
  AdjustClocks,
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
      tableLoading: false,
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
      dialogLoading: false,
      selectedClock: {} as EmployeeClocks,
      isEditing: false,
      hasChanges: false,
      showErrorMessage: false,
      cancelRequest: false,
    };
  },
  async created() {
    await this.getTableValues(this.queries);
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee"]),
  },
  methods: {
    ...mapActions(useEmployeeStore, ["getRegisteredClocks", "updateDayClock"]),
    handleChange(value: boolean) {
      this.hasChanges = value;
      this.cancelRequest = false;
    },
    handleCancelEditing() {
      this.toggleVisibility();
      this.resetDialog();
    },
    resetDialog() {
      this.isEditing = false;
      this.hasChanges = false;
      this.showErrorMessage = false;
    },
    async handleSaveEditing(values: AdjustClocks) {
      if (!this.hasChanges) {
        this.showErrorMessage = true;
        return;
      }

      Object.values(values).forEach((value) => {
        if (!DateTime.fromISO(value).c) {
          this.cancelRequest = true;
        }
      });

      if (this.cancelRequest)
        return this.$toast.add({
          severity: "error",
          summary: "Horas inválidas!",
          detail: "Verifique e tente novamente.",
          life: 4000,
        });

      this.dialogLoading = true;
      try {
        await this.updateDayClock(this.employee.id, values);
        await this.getTableValues(this.queries);

        this.toggleVisibility();
        this.resetDialog();
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado!",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      } finally {
        this.dialogLoading = false;
      }
    },
    handleClockDialog(data: EmployeeClocks) {
      this.toggleVisibility();
      this.selectedClock = data;
    },
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: EmployeeQueryParams) {
      this.tableLoading = true;
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
        this.tableLoading = false;
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
  width: 50rem;

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

.dark-mode .clocks {
  &__summary {
    &--positive {
      color: map-get($color-scheme-dark, "$color-feedback-success-0");
    }

    &--negative {
      color: map-get($color-scheme-dark, "$color-feedback-danger-0");
    }
  }
}
</style>
