<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Ajustes pendentes</h2>
    <BaseTable
      :loading="tableLoading"
      :columns="columns"
      :nodes="nodes"
      :total-pages="totalPages"
      :custom-filters="filters"
      header-shown
      has-action
      @update-filter-handler="getTableValues"
      @change-page="changePageHandler"
    >
      <template #body-cell="{ data, field }">
        <span
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
          tooltip-text="Verificar ajuste"
          :icon="'pi-search'"
          :data="slotData"
          @action-handler="logSelectedItem"
        />
      </template>
    </BaseTable>

    <BaseDialog
      title="Ajustar ponto"
      :is-visible="isVisible"
      :toggle-dialog="toggleDialog"
    >
      <div class="adjust">
        <div class="adjust__info">
          <span class="caption__primary">Solicitante:</span>

          <div class="adjust__info--employee">
            <p class="body__primary">{{ userPendingRequests?.name }}</p>
            <span class="caption__primary">{{
              userPendingRequests?.role
            }}</span>
          </div>
        </div>

        <div class="adjust__approval">
          <BaseCheckbox input-id="approval" @change="handleApproveAll" />
          <label for="approval" class="body__primary">Aprovar tudo</label>
        </div>

        <div class="adjust__accordion">
          <TimeSheetAdjustAccordion
            v-if="userPendingRequests"
            :user="userPendingRequests"
            :approve-all="approveAll"
            @button-handler="buttonHandler"
          />
        </div>
      </div>

      <template #footer>
        <BaseInlineMessage
          v-if="showErrorMessage"
          severity="error"
          text="Selecione uma ação para prosseguir"
        />

        <div class="adjust__footer">
          <BaseButton
            icon="pi pi-times"
            label="Cancelar"
            class="btn__danger--outlined"
            :disabled="dialogLoading"
            @click="toggleDialog"
          />
          <BaseButton
            icon="pi pi-save"
            label="Salvar"
            class="btn__secondary"
            :loading="dialogLoading"
            @click="submitPendingRequests"
          />
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";
import { PageState } from "primevue/paginator";
import {
  PendingAdjust,
  QueryParams,
} from "~/interfaces/time-sheet/time-sheet.interface";
import { Filter } from "~/interfaces/table.interface";

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
        },
        {
          field: "currentBalance",
          header: "Saldo atual",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "totalRequests",
          header: "Ajustes pendentes",
          sortable: false,
          hasFilter: true,
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
      updatedPendingRequests: [] as Request[],
      showErrorMessage: false,
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
    },
    handleApproveAll() {
      this.approveAll = !this.approveAll;

      if (this.approveAll) {
        return this.userPendingRequests?.requests.map((request) => ({
          requestId: request.id,
          approved: true,
        }));
      }
    },
    buttonHandler(requests: Request[]) {
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
    async logSelectedItem({ data }: PendingAdjust) {
      this.toggleDialog();

      try {
        await this.getUserPendingAdjustments(data.userId);
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      }
    },
    async submitPendingRequests() {
      if (!this.userPendingRequests || !this.updatedPendingRequests.length) {
        this.showErrorMessage = true;
        return;
      }

      this.dialogLoading = true;
      try {
        await this.updateRequestsApproval(
          this.userPendingRequests.userId,
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

<style scoped lang="scss">
.adjust {
  width: 60rem;
  height: 60rem;

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
