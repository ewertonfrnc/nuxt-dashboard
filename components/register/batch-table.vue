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
          :disabled="loading"
          @click="toggleAddEditDialog"
        />

        <BaseButton
          icon="pi pi-check"
          label="Confirmar e cadastrar"
          class="btn__primary"
          :disabled="!canProceed || loading"
          :loading="loading"
          @click="saveBatch"
        />
      </div>
    </div>

    <section class="information">
      <p class="body__primary">
        Serão cadastrados
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

      <BaseInlineMessage
        v-show="rowsWithMissingField"
        severity="error"
        :text="`${rowsWithMissingField} colaboradores precisam de revisão antes de realizar o cadastro`"
      />
    </section>

    <section>
      <BaseTable
        has-action
        header-shown
        :columns="columns"
        :custom-filters="filters"
        :nodes="nodes"
        :total-pages="totalPages"
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
            @action-handler="selectToEdit(slotData.data)"
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
      <RegisterAddEditForm
        :loading="loading"
        :toggle-dialog="resetAddEditForm"
        :selected-employee="selectedEmployee"
        @submit="addEditRowHandler"
      />
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FormMeta, GenericObject } from "vee-validate";
import { RegisterEmployee } from "~/interfaces/register/register.interface";
import { useRegisterEmployeesStore } from "~/stores/settings/register-employees";
import { registerEmpSchema } from "~/utils/schemas/register/employees.schema";

export default {
  emits: ["change-page"],
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
      nodes: [] as RegisterEmployee[],
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
        global: { value: "", matchMode: "" },
      },
      filters: {},
      selectedRow: {} as RegisterEmployee,
      canProceed: true,
      selectedEmployee: {} as RegisterEmployee | {},
      rowsWithMissingField: 0,
    };
  },
  computed: {
    ...mapState(useRegisterEmployeesStore, ["csvData", "total"]),
    formSchema() {
      return registerEmpSchema;
    },
  },
  created() {
    this.nodes = this.csvData;
    this.totalPages = this.total;

    this.totalPages = this.calculateTotalPages();
    this.checkForMissingFields(this.nodes);
  },
  methods: {
    ...mapActions(useRegisterEmployeesStore, [
      "updateCsvData",
      "fetchWorkOptions",
      "saveEmployeesBatch",
    ]),
    saveBatch() {
      this.loading = true;

      setTimeout(() => {
        this.saveEmployeesBatch(this.nodes)
          .then(({ registedEmployees, needReview }) => {
            this.getToast("success");
            this.$emit("change-page", {
              page: "success",
              params: { registedEmployees, needReview },
            });
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 2000);
    },
    calculateNumOfReviews(tableNodes: RegisterEmployee[]) {
      this.rowsWithMissingField = tableNodes.reduce(
        (accumulator, currentValue) =>
          currentValue.missingField ? accumulator + 1 : accumulator,
        0,
      );
    },
    calculateTotalPages(): number {
      const length = this.nodes.length;
      return Math.ceil(length / 10) < 1 ? 1 : Math.ceil(length / 10);
    },
    selectToDelete(selected: RegisterEmployee): void {
      this.selectedRow = selected;
      this.toggleDeleteDialog();
    },
    selectToEdit(selected: RegisterEmployee) {
      this.selectedEmployee = selected;
      this.toggleAddEditDialog();
    },
    resetAddEditForm() {
      this.selectedEmployee = {};
      this.toggleAddEditDialog();
    },
    deleteRow(): void {
      this.nodes = this.nodes.filter((node) => node.id !== this.selectedRow.id);
      this.toggleDeleteDialog();
      this.getToast("success");
    },
    addEditRowHandler(
      values: RegisterEmployee,
      meta: FormMeta<GenericObject>,
    ): void {
      if (values.id) {
        const itemToEdit = this.nodes.find((item) => item.id === values.id);
        const index = this.nodes.findIndex(
          (item) => item.id === itemToEdit?.id,
        );

        this.nodes.splice(index, 1, { ...values });
        this.resetAddEditForm();
      } else if (meta && meta.valid && meta.dirty) {
        const newEmployee = {
          ...values,
          id: this.nodes.length + 1,
        } as RegisterEmployee;

        this.nodes.unshift(newEmployee);
        this.toggleAddEditDialog();
      }

      this.checkForMissingFields(this.nodes);
    },
    checkForMissingFields(array: RegisterEmployee[]): void {
      array.forEach((obj) => {
        const missingFields: string[] = Object.keys(obj).reduce(
          (acc: string[], key: string) => {
            const value: string = obj[key];
            if (value === "") acc.push(key);

            return acc;
          },
          [],
        );

        obj.missingField = !!missingFields.length;
        this.canProceed = !this.nodes.some((item) => item.missingField);
        this.calculateNumOfReviews(this.nodes);
      });
    },
    footerDeleteHandler(btnClicked: string): void {
      if (btnClicked === "confirm") this.deleteRow();
      else this.toggleDeleteDialog();
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
    align-items: center;
    gap: 8px;

    button {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      cursor: pointer;
      transition: all 0.3s;
    }
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
</style>
