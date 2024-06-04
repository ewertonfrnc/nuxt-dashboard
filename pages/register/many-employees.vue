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
          @click="toggleAddEditDialog"
        />

        <BaseButton
          icon="pi pi-check"
          label="Confirmar e cadastrar"
          class="btn__primary"
        />
      </div>
    </div>

    <section class="information">
      <p class="body__primary">
        De acordo com o seu arquivo, serão cadastrados
        <strong class="highlight">{{ nodes.length }} colaboradores</strong>.
      </p>

      <p class="body__primary">
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
        has-action
        header-shown
        :columns="columns"
        :custom-filters="filters"
        :loading="loading"
        :nodes="nodes"
        :total-pages="totalPages"
        @update-filter-handler="getTableValues"
        @change-page="changePageHandler"
      >
        <template #body-cell="{ data, field }">
          <span :class="['body__primary', data.missingField && 'row_error']">
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
            @action-handler="selectToDelete"
          />
        </template>
      </BaseTable>
    </section>

    <BaseDialog
      :is-visible="isDeleteDialogVisible"
      :toggle-dialog="toggleDeleteDialog"
      confirm-warn
      confirm-dialog
      confirm-icon="pi-exclamation-circle"
      title="Cadastrar por arquivo"
    >
      <p class="body__secondary">
        Tem certeza que deseja excluir este colaborador do cadastro?
      </p>

      <template #footer>
        <BaseDialogFooter
          :loading="false"
          confirm-icon="pi pi-check"
          confirmlabel="Confirmar"
          message="Selecione uma ação para prosseguir"
          @click-handler="footerDeleteHandler"
        />
      </template>
    </BaseDialog>

    <BaseDialog
      :is-visible="isAddEditDialogVisible"
      :toggle-dialog="toggleAddEditDialog"
      title="Adicionar colaborador no cadastro"
    >
      <VeeForm
        v-slot="{ values, errors, meta }"
        class="form"
        :validation-schema="formSchema"
      >
        <p class="body__secondary">
          Insira os dados do colaborador para que seja adicionado no cadastro em
          lote.
        </p>

        <h4 class="subtitle__primary">Dados principais</h4>

        <div class="form__personal">
          <div class="form__control">
            <label class="caption__primary">
              Nome completo ou Social
              <BaseInputText name="name" placeholder="Insira o nome completo" />
            </label>
          </div>

          <div class="form__control">
            <label class="caption__primary">
              RG
              <BaseInputMask
                name="rg"
                mask="999.999.999"
                placeholder="Insira o RG"
              />
            </label>
          </div>

          <div class="form__control">
            <label class="caption__primary">
              CPF
              <BaseInputMask
                name="cpf"
                mask="999.999.999-99"
                placeholder="Insira o CPF"
              />
            </label>
          </div>

          <div class="form__control">
            <label class="caption__primary">
              Telefone
              <BaseInputMask
                name="phone"
                mask="(99) 99999-9999"
                placeholder="Insira o telefone"
              />
            </label>
          </div>
        </div>

        <h4 class="subtitle__primary">Dados profissionais</h4>

        <div class="form__profissional">
          <div class="form__control">
            <label class="caption__primary">
              Cargo

              <BaseDropdown
                name="role"
                :options="roleOptions"
                placeholder="Insira o cargo"
              />
            </label>
          </div>

          <div class="form__control">
            <label class="caption__primary">
              Departamento

              <BaseDropdown
                name="department"
                :options="departmentOptions"
                placeholder="Insira o cargo"
              />
            </label>
          </div>
        </div>

        <div class="form__btn-group">
          <BaseButton
            class="btn__primary--outlined"
            icon="pi pi-times"
            label="Cancelar"
            @click="toggleAddEditDialog"
          />

          <BaseButton
            type="submit"
            class="btn__primary"
            icon="pi pi-plus"
            label="Adicionar"
            :disabled="!validForm"
            @click="addEditRowHandler(values, errors, meta)"
          />
        </div>
      </VeeForm>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";
import { checkForErrors } from "~/utils/forms";
import { registerEmpSchema } from "~/utils/schemas/register/employees.schema";

export default {
  setup() {
    const { getToast } = usePVToast();

    const {
      isVisible: isDeleteDialogVisible,
      toggleVisibility: toggleDeleteDialog,
    } = useToggle();

    const {
      isVisible: isAddEditDialogVisible,
      toggleVisibility: toggleAddEditDialog,
    } = useToggle();

    return {
      isDeleteDialogVisible,
      toggleDeleteDialog,
      isAddEditDialogVisible,
      toggleAddEditDialog,
      getToast,
    };
  },
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
      selectedRow: {},
      roleOptions: ["Design", "Front-end", "Back-end"],
      departmentOptions: ["Hub", "Fábrica"],
      validForm: true,
    };
  },
  computed: {
    ...mapState(useRegisterEmployeesStore, ["csvData"]),
    formSchema() {
      return registerEmpSchema;
    },
  },
  created() {
    this.nodes = [...this.csvData];
    this.totalPages = this.calculateTotalPages();
    this.checkForMissingFields(this.nodes);
  },
  methods: {
    checkForMissingFields(array) {
      array.forEach((obj) => {
        const missingFields = Object.keys(obj).reduce((acc, key) => {
          if (obj[key] === "") acc.push(key);
          return acc;
        }, []);

        obj.missingField = !!missingFields.length;
      });

      console.log(array);
    },
    calculateTotalPages() {
      const length = this.nodes.length;
      return parseInt(length / 10) < 1 ? 1 : parseInt(length / 10);
    },
    selectToDelete(selected) {
      this.selectedRow = selected;
      this.toggleDeleteDialog();
    },
    deleteRow() {
      this.nodes = this.nodes.filter((node) => node.id !== this.selectedRow.id);
      this.toggleDeleteDialog();
    },
    addEditRowHandler(values, errors, meta) {
      if (meta && meta.valid && meta.dirty) {
        this.nodes.unshift({
          ...values,
          id: this.nodes.length + 1,
          email: "",
          workType: "",
          workRegime: "",
          missingField: true,
        });
        this.checkForMissingFields(this.nodes);
        this.toggleAddEditDialog();
      }
    },
    footerDeleteHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.deleteRow();
      else this.toggleDeleteDialog();
    },
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

.information {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
}

.row_error {
  color: map-get($color-scheme-light, "$color-feedback-danger-0");
}

.form {
  width: 90vw;
  display: grid;
  gap: 24px;

  &__personal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__profissional {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 70px;
  }

  &__control {
    width: 343px;
  }

  &__btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    button {
      width: max-content;
    }
  }
}
</style>
