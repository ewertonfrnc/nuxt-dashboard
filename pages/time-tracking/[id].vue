<template>
  <BaseCard>
    <div class="container">
      <div class="container__header">
        <div class="container__navigation">
          <button
            type="button"
            class="btn__primary--text"
            @click="$router.back()"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <h2 class="heading__secondary">{{ $route.params.id }}</h2>
        </div>

        <div>
          <BaseButton
            class="btn__danger"
            icon="pi pi-times"
            label="Cancelar fechamento"
          />
        </div>
      </div>

      <div class="container__filter">
        <label class="caption__primary container__filter--label">
          <span class="caption__primary">Data de exibição</span>
          <div class="filter__calendar">
            <BaseDatePicker
              inline-icon
              :selection-mode="'range'"
              @date-handler="() => {}"
            />
          </div>
        </label>

        <div class="container__filter--status">
          <span class="caption__primary">Status</span>
          <p class="body__primary">Enviado</p>
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
        download
        @update-filter-handler="getTableValues"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <BaseTag
            v-if="field === 'status'"
            :severity="
              data[field] === 'Aguardando assinatura' ? 'Warning' : 'Success'
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
          <a :href="slotData.data.pdfUrl" target="_blank">
            <BaseTableAction
              :data="{ slotData }"
              icon="pi-download"
              tooltip-text="Ver PDF"
            />
          </a>

          <BaseTableAction
            class="ml-4"
            :data="{ slotData }"
            :disabled="!slotData.data.pendingSignature || actionLoading"
            icon="pi-send"
            tooltip-text="Enviar para assinatura"
            @action-handler="sendToSignature"
          />
        </template>
      </BaseTable>

      <div class="container__footer">
        <span class="subtitle__primary highlight">
          {{ pendingCount }} colaboradores não assinaram
        </span>

        <div>
          <BaseButton
            class="btn__primary"
            icon="pi pi-send"
            label="Reenviar para assinar"
            @click="sendBatch"
          />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import {
  QueryClockClosingDetails,
  ClockClosing,
} from "~/interfaces/time-tracking/time-tracking.interface";

export default {
  setup() {
    const { getToast } = usePVToast();
    return { getToast };
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
        },
        {
          field: "role",
          header: "Cargo",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "status",
          header: "Status",
          sortable: false,
          hasFilter: true,
        },
      ],
      nodes: [] as ClockClosing[],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        name: { value: "", matchMode: "" },
        role: { value: "", matchMode: "" },
        status: { value: "", matchMode: "" },
      },
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
        status: {
          field: "status",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
      actionLoading: false,
      pendingSignatures: [] as ClockClosing[],
      pendingCount: 0,
    };
  },
  computed: {
    ...mapState(useTimeTrackingStore, [
      "total",
      "employees",
      "pendingSignatureCount",
    ]),
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useTimeTrackingStore, [
      "getClockClosingDetails",
      "requestSignatureBatch",
      "requestSignature",
    ]),
    async sendBatch() {
      this.pendingSignatures = this.employees.filter(
        (employee) => employee.pendingSignature,
      );
      try {
        await this.requestSignatureBatch(
          String(this.$route.params.id),
          this.pendingSignatures,
        );
        this.getToast("success");
      } catch (err) {
        this.getToast("error");
      } finally {
        this.actionLoading = false;
      }
    },
    async sendToSignature(data: ClockClosing) {
      this.actionLoading = true;
      try {
        await this.requestSignature(data);
        this.getToast("success");
      } catch (err) {
        this.getToast("error");
      } finally {
        this.actionLoading = false;
      }
    },
    async changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      await this.getTableValues(this.queries);
    },
    async getTableValues(queryParams: QueryClockClosingDetails) {
      this.loading = true;
      try {
        await this.getClockClosingDetails(
          String(this.$route.params.id),
          queryParams,
        );

        this.pendingCount = this.pendingSignatureCount;
        this.nodes = this.employees;
        this.totalPages = this.total;
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  display: grid;
  gap: 24px;

  &__filter {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--label {
      width: 343px;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
  }
}
</style>
