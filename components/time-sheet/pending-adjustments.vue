<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Ajustes pendentes</h2>

    <BaseTable
      :loading="loading"
      :columns="columns"
      :nodes="nodes"
      header-shown
      has-action
      @update-filter-handler="getTableValues"
    >
      <template #column-header>
        <span>Ações</span>
      </template>

      <template #column-action="slotData">
        <span class="body__primary">
          <i
            v-tooltip.top="{
              value: 'Verificar ajuste',
              pt: { root: 'tooltip' },
            }"
            class="pi pi-search"
            @click="logSelectedItem(slotData)"
          />
        </span>
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
            <template v-if="loading">
              <UiActivityIndicator size="small" />
            </template>
            <template v-else>
              <p class="body__primary">{{ user.name }}</p>
              <span class="caption__primary">{{ user.role }}</span>
            </template>
          </div>
        </div>

        <div v-if="!loading" class="adjust__approval">
          <BaseCheckbox input-id="approval" />
          <label for="approval" class="body__primary">Aprovar tudo</label>
        </div>

        <div class="adjust__accordion">
          <div v-if="loading" class="adjust__loading">
            <UiActivityIndicator size="large" />
          </div>

          <TimeSheetAdjustAccordion v-if="!loading && user" :user="user" />
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import {
  PendingAdjust,
  QueryParams,
} from "~/interfaces/time-sheet/time-sheet.interface";
import { Filter } from "~/interfaces/table.interface";

export default {
  data() {
    return {
      loading: true,
      isVisible: false,
      user: {},
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
      queries: {
        global: { value: "", matchMode: "" },
        name: { value: "2", matchMode: "" },
        currentBalance: { value: "", matchMode: "" },
        totalRequests: { value: "3", matchMode: "" },
      },
    };
  },
  async mounted() {
    await this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useTimeSheetStore, [
      "getPendingAdjustments",
      "getUserPendingAdjustments",
    ]),
    arrayToObject(array: Filter[]) {
      return array.reduce((accumulator, currentValue) => {
        const { field, value, matchMode } = currentValue;
        return Object.assign(accumulator, { [field]: { value, matchMode } });
      }, {});
    },
    toggleDialog() {
      this.isVisible = !this.isVisible;
    },
    async getTableValues(queryParams: QueryParams) {
      const queryParamsArray = Object.values(queryParams);
      this.queries = this.arrayToObject(queryParamsArray);

      this.loading = true;
      try {
        this.nodes = await this.getPendingAdjustments(this.queries);
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
    async logSelectedItem({ data }: PendingAdjust) {
      this.toggleDialog();

      try {
        this.user = await this.getUserPendingAdjustments(data.userId);
      } catch (err) {
        console.log(err);
      }
    },
    handleBtnGroup(clickedBtn: string) {
      console.log({ clickedBtn });
    },
    rejectAdjustment(adjustmentId: number) {
      console.log({ adjustmentId });
    },
    approveAdjustment(adjustmentId: number) {
      console.log({ adjustmentId });
    },
  },
};
</script>

<style scoped lang="scss">
.adjust {
  width: 60rem;

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
}
</style>
