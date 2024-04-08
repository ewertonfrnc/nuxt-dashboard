<template>
  <h3>Informações adicionais</h3>
  <BaseTable
    :columns="columns"
    :nodes="slotProps.requests"
    :paginator="false"
    :sortable="false"
    has-action
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
          <p class="body__primary">Ana Maria Martins Rocha</p>
          <span class="caption__primary">Nutricionista</span>
        </div>
      </div>

      <div class="adjust__approval">
        <BaseCheckbox input-id="approval" />
        <label for="approval" class="body__primary">Aprovar tudo</label>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
export default {
  props: {
    slotProps: { type: Object, required: true },
  },
  data() {
    return {
      columns: [
        { field: "date", header: "Data" },
        { field: "dateBalance", header: "Saldo do dia" },
      ],
      isVisible: false,
    };
  },
  methods: {
    toggleDialog() {
      this.isVisible = !this.isVisible;
    },
    logSelectedItem(selectedItem) {
      this.toggleDialog();
      console.log(selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.adjust {
  width: 50rem;

  &__info {
    &--employee {
      margin-top: 1rem;
      span {
        color: map-get($color-scheme-light, "$color-neutral-neutral-3");
      }
    }
  }

  &__approval {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
}
</style>
