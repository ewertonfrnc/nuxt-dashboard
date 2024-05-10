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
            v-if="field === 'status'"
            :severity="
              data[field] === 'Pendente'
                ? 'Warning'
                : data[field] === 'Reprovado'
                ? 'Danger'
                : 'Success'
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
            :icon="'pi-pencil'"
            :disabled="slotData.data.status !== 'Pendente'"
            tooltip-text="Ver detalhes do dia"
            @action-handler="logSelectedItem"
          />
        </template>
      </BaseTable>

      <BaseDialog
        :is-visible="isVisible"
        :toggle-dialog="toggleVisibility"
        title="Ajustar ponto"
      >
        <SharedAdjustClockDialog
          :employee="employee"
          :loading="dialogLoading"
          :approve-all="approveAll"
          :adjusts="selectedAdjust.requests"
          :show-error-message="showErrorMessage"
          :cancel-handler="toggleDialog"
          :confirm-handler="submitPendingRequests"
          @approved-all="handleApproveAll"
          @button-handler="buttonHandler"
        />

        <template #footer>
          <BaseDialogFooter
            :loading="dialogLoading"
            :show-error-message="showErrorMessage"
            message="Selecione uma ação para prosseguir"
            @click-handler="footerActionHandler"
          />
        </template>
      </BaseDialog>
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
  WorkLog,
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
      selectedAdjust: {} as EmployeeAdjusts,
      approveAll: false,
      updatedPendingRequests: [] as WorkLog[],
    };
  },
  computed: {
    ...mapState(useEmployeeStore, ["employee", "adjusts", "total"]),
  },
  async created() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useEmployeeStore, ["getDatesToAdjust"]),
    ...mapActions(useTimeSheetStore, ["updateRequestsApproval"]),
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.submitPendingRequests();
      else this.toggleDialog();
    },
    logSelectedItem(data: EmployeeAdjusts) {
      this.toggleVisibility();
      this.selectedAdjust = data;
    },
    handleApproveAll(value: boolean) {
      this.approveAll = value;
    },
    buttonHandler(requests: WorkLog[]) {
      this.updatedPendingRequests = requests;
    },
    toggleDialog() {
      this.toggleVisibility();
      this.showErrorMessage = false;
      this.updatedPendingRequests = [];
      this.approveAll = false;
    },
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
    async submitPendingRequests() {
      if (!this.updatedPendingRequests.length) {
        this.showErrorMessage = true;
        return;
      }

      this.dialogLoading = true;
      try {
        await this.updateRequestsApproval(
          this.employee.id,
          this.updatedPendingRequests,
        );
        await this.getTableValues(this.queries);

        this.$toast.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Ação realizada com sucesso.",
          life: 4000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Ocorreu um erro!",
          detail: "Ocorreu um erro de processamento, tente novamente.",
          life: 4000,
        });
      } finally {
        this.dialogLoading = false;
        this.toggleDialog();
      }
    },
  },
};
</script>
