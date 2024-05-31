<template>
  <BaseCard>
    <div class="header">
      <div class="header__navigation">
        <button
          type="button"
          class="btn__primary--text"
          @click="$router.back()"
        >
          <i class="pi pi-arrow-left"></i>
        </button>

        <h2 class="heading__secondary">Cadastrar vários colaboradores</h2>
      </div>

      <div class="header__btns">
        <BaseButton
          icon="pi pi-table"
          label="Adicionar linha"
          class="btn__primary--outlined"
        />

        <BaseButton
          icon="pi pi-check"
          label="Confirmar e cadastrar"
          class="btn__primary"
        />
      </div>
    </div>

    <section>
      <p>
        De acordo com o seu arquivo, serão cadastrados
        <strong>330 colaboradores</strong>.
      </p>

      <p>
        Após a confirmação, caso deseje, você poderá enviar o restante do
        cadastro para que os colaboradores completem as demais informações
        opcionais.
      </p>

      <BaseInlineMessage
        severity="warn"
        text="Revise a sua lista antes de confirmar e faça as alterações caso necessário"
      />
    </section>

    <section>
      <BaseTable
        :columns="columns"
        :custom-filters="filters"
        :loading="loading"
        :nodes="nodes"
        :total-pages="totalPages"
        has-action
        header-shown
        @update-filter-handler="getTableValues"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <span class="body__primary">
            {{ data[field] }}
          </span>
        </template>

        <template #column-header>
          <span class="heading__quinary">Ações</span>
        </template>

        <template #column-action="slotData">
          <BaseTableAction
            class="mr-4"
            icon="pi-pencil"
            tooltip-text="Editar"
            :data="{ slotData }"
            @action-handler="() => {}"
          />

          <BaseTableAction
            icon="pi-trash danger"
            tooltip-text="Excluir"
            :data="{ slotData }"
            @action-handler="() => {}"
          />
        </template>
      </BaseTable>
    </section>
  </BaseCard>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";

export default {
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPages: 0,
      nodes: [],
      columns: [
        {
          field: "name",
          header: "Nome",
          sortable: true,
          hasFilter: false,
        },
        {
          field: "email",
          header: "E-mail",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "cpf",
          header: "CPF",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "phone",
          header: "Telefone",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "department",
          header: "Departamento",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "role",
          header: "Cargo",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "workType",
          header: "Modelo de trabalho",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "workRegime",
          header: "Modelo de contrato",
          sortable: false,
          hasFilter: false,
        },
      ],
      queries: {
        page: 1,
        limit: 10,
        global: { value: "", matchMode: "" },
        name: { value: "", matchMode: "" },
      },
      filters: {
        role: {
          field: "name",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
    };
  },
  computed: {
    ...mapState(useRegisterEmployeesStore, ["csvData"]),
  },
  created() {
    console.log([...this.csvData]);
    this.nodes = this.csvData;
  },
  methods: {
    changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      this.getTableValues(this.queries);
    },
    getTableValues(queryParams) {
      this.loading = true;

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__navigation {
    display: flex;
    gap: 8px;
  }

  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    button {
      width: max-content;
    }
  }
}
</style>
