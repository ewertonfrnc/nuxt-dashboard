<script lang="ts">
export default {
  props: {
    slotProps: { type: Object, required: true },
  },
  data() {
    return {
      columns: [
        { field: "weight", header: "Peso" },
        { field: "gender", header: "Gênero" },
        { field: "phone", header: "Contato" },
      ],
    };
  },
};
</script>

<template>
  <h3>Informações adicionais</h3>
  <BaseTable
    :columns="columns"
    :nodes="[slotProps]"
    :paginator="false"
    :sortable="false"
  />
</template>
