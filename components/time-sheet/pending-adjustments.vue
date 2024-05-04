<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Ajustes pendentes</h2>

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
          <span
            :class="[
              'body__primary',
              field === 'totalRequests' && 'highlight',
              field === 'currentBalance' && data.negative && 'negative',
              field === 'currentBalance' && !data.negative && 'positive',
            ]"
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
            :icon="'pi-search'"
            tooltip-text="Verificar ajuste"
            @action-handler="logSelectedItem"
          />
        </template>
      </BaseTable>

      <BaseDialog
        :is-visible="isVisible"
        :toggle-dialog="toggleDialog"
        title="Ajustar ponto"
      >
        <EmployeeAdjustClockDialog
          :employee="selectedUser"
          :loading="dialogLoading"
          :approve-all="approveAll"
          :adjusts="selectedUser.requests"
          :show-error-message="showErrorMessage"
          :cancel-handler="toggleDialog"
          :confirm-handler="submitPendingRequests"
          @approved-all="handleApproveAll"
          @button-handler="buttonHandler"
        />
      </BaseDialog>
    </section>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";
import { PageState } from "primevue/paginator";
import {
  QueryParams,
  User,
} from "~/interfaces/time-sheet/time-sheet.interface";
import { Filter } from "~/interfaces/table.interface";
import { WorkLog } from "~/interfaces/employee/employee.interface";

export default {
  data() {
    return {
      // table
      tableLoading: true,
      columns: [
        {
          field: "name",
          header: "Nome",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "currentBalance",
          header: "Saldo atual",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
        {
          field: "totalRequests",
          header: "Ajustes pendentes",
          sortable: false,
          hasFilter: true,
          frozen: false,
        },
      ],
      nodes: [],
      totalPages: 0,
      currentPage: 1,
      queries: {
        page: 1,
        global: { value: "", matchMode: "" },
        name: { value: "2", matchMode: "" },
        currentBalance: { value: "", matchMode: "" },
        totalRequests: { value: "3", matchMode: "" },
      },
      filters: {
        name: {
          field: "name",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        currentBalance: {
          field: "currentBalance",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        totalRequests: {
          field: "totalRequests",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },

      // pending requests
      dialogLoading: false,
      isVisible: false,
      approveAll: false,
      updatedPendingRequests: [] as WorkLog[],
      showErrorMessage: false,
      selectedUser: {} as User,
    };
  },
  computed: {
    ...mapState(useTimeSheetStore, ["userPendingRequests"]),
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useTimeSheetStore, [
      "getPendingAdjustments",
      "getUserPendingAdjustments",
      "updateRequestsApproval",
    ]),
    arrayToObject(array: Filter[]) {
      return array.reduce((accumulator, currentValue) => {
        const { field, value, matchMode } = currentValue;
        return Object.assign(accumulator, { [field]: { value, matchMode } });
      }, {});
    },
    toggleDialog() {
      this.isVisible = !this.isVisible;
      this.showErrorMessage = false;
      this.updatedPendingRequests = [];
      this.approveAll = false;
    },
    handleApproveAll(value: boolean) {
      this.approveAll = value;
    },
    buttonHandler(requests: WorkLog[]) {
      this.updatedPendingRequests = requests;
    },
    async changePageHandler(currentPage: PageState) {
      this.currentPage = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: QueryParams) {
      const queryParamsArray = Object.values(queryParams);
      this.queries = this.arrayToObject(queryParamsArray);

      this.tableLoading = true;
      try {
        const { pending, total } = await this.getPendingAdjustments({
          ...this.queries,
          page: this.currentPage,
        });
        this.nodes = pending;
        this.totalPages = total;
      } catch (err) {
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
    logSelectedItem(data: User) {
      this.toggleDialog();
      this.selectedUser = data;
    },
    async submitPendingRequests() {
      if (!this.selectedUser || !this.updatedPendingRequests.length) {
        this.showErrorMessage = true;
        return;
      }

      this.dialogLoading = true;
      try {
        await this.updateRequestsApproval(
          this.selectedUser.userId,
          this.updatedPendingRequests,
        );

        this.$toast.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Ação realizada com sucesso.",
          life: 4000,
        });
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Ocorreu um erro!",
          detail: "Ocorreu um erro de processamento, tente novamente.",
          life: 4000,
        });
      } finally {
        this.dialogLoading = false;
        this.toggleDialog();
        await this.getTableValues(this.queries);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 2rem;
}

.adjust {
  width: 60rem;
  height: 60rem;
  padding-right: 10px;
  overflow-x: hidden;

  @include respond(phone) {
    width: 100%;
  }

  &__info {
    &--employee {
      margin-top: 1rem;
      span {
        color: map-get($color-scheme-light, "$color-neutral-neutral-3");
      }
    }
  }

  &__loading {
    display: grid;
    place-content: center;
    height: 20rem;
  }

  &__approval {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    label {
      cursor: pointer;
    }
  }

  &__footer {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    button {
      max-width: 14rem;
    }
  }
}
</style>
