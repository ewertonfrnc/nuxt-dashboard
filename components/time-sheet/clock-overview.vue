<template>
  <div class="fadein animation-duration-500">
    <h2 class="heading__secondary">Todos os pontos</h2>

    <section>
      <label class="caption__primary filter__label">
        <span>Data de exibição</span>
        <BaseDatePicker />
      </label>

      <BaseTable
        :loading="loading"
        :columns="columns"
        :nodes="nodes"
        header-shown
        has-action
      >
        <template #body-cell="{ data, field }">
          <BaseTag
            v-if="field === 'tag'"
            :severity="data[field] === 'check-in' ? 'Success' : 'Danger'"
            :value="data[field]"
          />

          <span
            v-else
            :class="['body__primary', field === 'totalRequests' && 'highlight']"
          >
            {{ data[field] }}
          </span>
        </template>

        <template #column-header>
          <span style="width: 1rem" class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            tooltip-text="Ver detalhes no perfil"
            :icon="'pi-user'"
            :data="slotData"
            @action-handler="goToEmployeeDetails"
          />
        </template>
      </BaseTable>
    </section>
  </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";

export default {
  data() {
    return {
      loading: false,
      date: null,
      columns: [
        {
          field: "hour",
          header: "Horário",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "name",
          header: "Nome",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "tag",
          header: "Tags",
          sortable: false,
          hasFilter: true,
        },
        {
          field: "department",
          header: "Departamento",
          sortable: false,
          hasFilter: true,
        },
      ],
      nodes: [],
      queries: {
        page: 1,
        limit: 10,
        global: { value: "", matchMode: "" },
        tag: { value: "", matchMode: "" },
        name: { value: "", matchMode: "" },
        hour: { value: "", matchMode: "" },
        department: { value: "", matchMode: "" },
      },
    };
  },
  async mounted() {
    await this.getClocks(this.queries);
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["fetchAllClocks"]),
    goToEmployeeDetails({ data }) {
      this.$router.push(`/employees/${data.id}`);
    },
    async getClocks(queryParams) {
      this.loading = true;

      try {
        this.nodes = await this.fetchAllClocks(queryParams);
      } catch (error) {
        console.log("error", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  margin-top: 2rem;
}

.filter {
  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
}
</style>
