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
    };
  },
  methods: {
    logSelectedItem(selectedItem) {
      console.log(selectedItem);
    },
  },
};
</script>

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
</template>
