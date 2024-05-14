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
          <h2 class="heading__secondary">Novo fechamento</h2>
        </div>
      </div>

      <p class="body__primary">
        Selecione o período referente ao fechamento de ponto. Ao clicar em
        próximo o espelho ponto de todos os colaboradores serão gerados.
      </p>

      <div class="container__filter">
        <label class="caption__primary container__filter--label">
          <span class="caption__primary">Data de exibição</span>
          <div class="filter__calendar">
            <BaseDatePicker
              :inline-icon="true"
              :selection-mode="'range'"
              @date-handler="datePickerHandler"
            />
          </div>
        </label>

        <div class="container__filter--status">
          <span class="caption__primary">Status</span>
          <p class="body__primary">Enviado</p>
        </div>
      </div>

      <BaseInlineMessage
        severity="info"
        text="Ao clicar em “Gerar PDFs e enviar, você irá gerar o fechamento de todos os 35 colaboradores cadastrados na empresa."
      />

      <div class="container__footer">
        <span v-if="pendingAdjustsCount" class="subtitle__primary highlight">
          Há {{ pendingAdjustsCount }} ajustes pendentes, resolva-os antes de
          gerar os PDFs
        </span>

        <div>
          <BaseButton
            class="btn__primary"
            icon="pi pi-arrow-right"
            label="Gerar PDFs e enviar"
            :disabled="disableBtn || pendingAdjustsCount"
            @click="toggleVisibility"
          />
        </div>
      </div>
    </div>

    <BaseDialog
      confirm-dialog
      confirm-warn
      confirm-icon="pi-exclamation-circle"
      :is-visible="isVisible"
      :toggle-dialog="toggleVisibility"
      title="Alterar senha"
    >
      <div>
        <p class="body__secondary">
          Tem certeza que deseja criar o fechamento para todos os 35
          colaboradores?
        </p>
      </div>

      <template #footer>
        <BaseDialogFooter
          :loading="loading"
          confirm-icon="pi pi-check"
          confirmlabel="Confirmar"
          message="Selecione uma ação para prosseguir"
          @click-handler="footerActionHandler"
        />
      </template>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { TimeTrackingPeriod } from "~/interfaces/time-tracking/time-tracking.interface";
import { dateFormatters } from "~/utils/formatters";

export default {
  setup() {
    const { isVisible, toggleVisibility } = useToggle();
    const { getToast } = usePVToast();
    return { isVisible, toggleVisibility, getToast };
  },
  data() {
    return {
      loading: false,
      disableBtn: true,
      selectedDates: null,
      dates: {} as TimeTrackingPeriod,
      pendingAdjustsCount: 0,
    };
  },
  methods: {
    ...mapActions(useTimeTrackingStore, ["generateDocumentAndSend"]),
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.generateAndSendPdf();
      else this.toggleVisibility();
    },
    datePickerHandler(dates: Date[]) {
      this.disableBtn = !dates[1];

      if (dates[1]) {
        this.dates = {
          start: dateFormatters.formatDate(dates[0]),
          final: dateFormatters.formatDate(dates[1]),
        };
      }
    },
    async generateAndSendPdf() {
      if (!this.dates.final) return;

      this.loading = true;
      try {
        const closingId = await this.generateDocumentAndSend(this.dates);
        this.$router.push(`${closingId}`);
        this.getToast("success");
      } catch (error) {
        this.getToast("error");
      } finally {
        this.loading = true;
        this.toggleVisibility();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__filter {
    display: flex;
    align-items: center;
    gap: 48px;

    @include respond(phone) {
      align-items: flex-start;
      flex-direction: column;
      gap: 24px;
    }

    &--label {
      width: 343px;

      @include respond(phone) {
        width: 100%;
      }
    }
  }
}
</style>
