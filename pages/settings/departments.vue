<template>
  <BaseCard>
    <div class="container">
      <div class="container__header">
        <h2 class="heading__secondary">Departamentos</h2>

        <div>
          <BaseButton
            class="btn__primary"
            icon="pi pi-plus"
            label="Cadastrar departamento"
            @click="toggleNewDepartmentDialog"
          />
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
            @action-handler="logSelectedItem"
          />

          <BaseTableAction
            icon="pi-trash danger"
            tooltip-text="Excluir"
            :data="{ slotData }"
            @action-handler="handleDeleteDialog"
          />
        </template>
      </BaseTable>
    </div>

    <BaseDialog
      :is-visible="isAddDialogVisible"
      :title="dialogTitle"
      :toggle-dialog="toggleAddDialogVisibility"
    >
      <SettingsDepartmentsAddEditForm
        :loading="dialogLoading"
        :selected-item="selectedItem"
        @submit="saveDepartment"
        @cancel-submit="cancelSubmit"
      />
    </BaseDialog>

    <BaseDialog
      :is-visible="isDeleteDialogVisible"
      title="Excluir departamento"
      :toggle-dialog="toggleDeleteDialogVisibility"
    >
      <div class="delete-dialog">
        <p class="body__secondary">
          Um departamento só pode ser excluído se não houverem colaboradores
          vinculados a ele. Você pode editá-lo caso seja necessário alterar o
          nome.
        </p>

        <div class="group-btn">
          <template v-if="selectedItem.employeesCount">
            <BaseButton
              class="btn__primary--outlined"
              label="Editar departamento"
              @click="handleEditing(selectedItem)"
            />
            <BaseButton
              class="btn__primary"
              label="Entendi"
              @click="toggleDeleteDialogVisibility"
            />
          </template>

          <template v-else>
            <BaseButton
              class="btn__primary--outlined"
              label="Cancelar"
              @click="toggleDeleteDialogVisibility"
            />
            <BaseButton
              class="btn__primary"
              label="Excluir"
              @click="deleteJobRole"
            />
          </template>
        </div>
      </div>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import {
  Department,
  QueryDepartments,
} from "~/interfaces/settings/departments.interface";
import { useDepartmentsStore } from "~/stores/settings/departments.store";
import { departmentSchema } from "~/utils/schemas/settings/deparment.schema";

export default {
  setup() {
    const { getToast } = usePVToast();
    const {
      isVisible: isAddDialogVisible,
      toggleVisibility: toggleAddDialogVisibility,
    } = useToggle();

    const {
      isVisible: isDeleteDialogVisible,
      toggleVisibility: toggleDeleteDialogVisibility,
    } = useToggle();

    return {
      getToast,
      isAddDialogVisible,
      toggleAddDialogVisibility,
      isDeleteDialogVisible,
      toggleDeleteDialogVisibility,
    };
  },
  data() {
    return {
      loading: false,
      totalPages: 0,
      currentPage: 1,
      nodes: [] as Department[],
      columns: [
        {
          field: "department",
          header: "Departmento",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "employeesCount",
          header: "Colaboradores",
          sortable: false,
          hasFilter: false,
        },
      ],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        department: { value: "", matchMode: "" },
        employeesCount: { value: "", matchMode: "" },
      },
      filters: {
        department: {
          field: "role",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        employeesCount: {
          field: "employeesCount",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },

      dialogLoading: false,
      selectedItem: {} as Department,
      dialogTitle: "Cadastrar departamento",
    };
  },
  computed: {
    ...mapState(useDepartmentsStore, ["total", "departments"]),
    formSchema() {
      return departmentSchema;
    },
  },
  created() {
    this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useDepartmentsStore, [
      "getDepartments",
      "saveDepartments",
      "deleteDepartments",
    ]),
    cancelSubmit() {
      this.toggleAddDialogVisibility();
    },
    toggleNewDepartmentDialog() {
      this.dialogTitle = "Cadastrar departamento";
      this.toggleAddDialogVisibility();
    },
    // Add new role dialog
    toggleAddDialog() {
      this.toggleAddDialogVisibility();
    },
    saveDepartment(values: Department) {
      this.dialogLoading = true;

      setTimeout(() => {
        this.saveDepartments(values)
          .then(() => {
            this.nodes = this.departments;
            this.totalPages = this.total;
            this.getToast("success");
          })
          .catch(() => this.getToast("error"))
          .finally(() => this.toggleAddDialog());

        this.dialogLoading = false;
      }, 1000);
    },
    // Delete dialog
    handleEditing(itemToEdit: Department) {
      this.toggleDeleteDialogVisibility();
      this.logSelectedItem(itemToEdit);
    },
    handleDeleteDialog(itemToDelete: Department) {
      this.toggleDeleteDialogVisibility();
      this.selectedItem = itemToDelete;
    },
    deleteJobRole() {
      this.dialogLoading = true;

      this.deleteDepartments(this.selectedItem)
        .then(() => this.getToast("success"))
        .catch(() => this.getToast("error"))
        .finally(() => this.toggleDeleteDialogVisibility());

      this.dialogLoading = false;
    },
    // Table
    logSelectedItem(data: Department) {
      this.selectedItem = data;
      this.dialogTitle = "Editar departamento";
      this.toggleAddDialogVisibility();
    },
    changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      this.getTableValues(this.queries);
    },
    getTableValues(queryParams: QueryDepartments) {
      this.loading = true;

      this.getDepartments(queryParams)
        .then(() => {
          this.nodes = this.departments;
          this.totalPages = this.total;
        })
        .catch(() => this.getToast("error"));

      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.add-dialog {
  width: 800px;
  display: grid;
  gap: 24px;

  &__form-container {
    display: flex;
    flex-direction: column;
  }

  &__form {
    display: flex;
    align-items: center;
    gap: 32px;

    label {
      width: 100%;
      height: 90px;
    }

    &--btn-group {
      margin-left: auto;
      width: max-content;
      display: flex;
      gap: 16px;
    }
  }
}

.delete-dialog {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
