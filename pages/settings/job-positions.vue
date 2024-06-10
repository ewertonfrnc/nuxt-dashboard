<template>
  <BaseCard>
    <div class="container">
      <div class="container__header">
        <h2 class="heading__secondary">Cargos</h2>

        <div>
          <BaseButton
            class="btn__primary"
            icon="pi pi-plus"
            label="Cadastrar cargo"
            @click="toggleAddDialogVisibility"
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
      title="Cadastrar cargo"
      :toggle-dialog="toggleAddDialogVisibility"
    >
      <JobPositionsAddEditForm
        :loading="dialogLoading"
        :selected-item="selectedItem"
        @submit="saveJobRole"
        @cancel-submit="cancelSubmit"
      />
    </BaseDialog>

    <BaseDialog
      :is-visible="isDeleteDialogVisible"
      title="Excluir cargo"
      :toggle-dialog="toggleDeleteDialogVisibility"
    >
      <div class="delete-dialog">
        <p class="body__secondary">
          Um cargo só pode ser excluído se não houverem colaboradores vinculados
          a ele. Você pode editá-lo caso seja necessário alterar o nome.
        </p>

        <div class="group-btn">
          <template v-if="selectedItem.employeesCount">
            <BaseButton
              class="btn__primary--outlined"
              label="Editar cargo"
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
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { mapActions, mapState } from "pinia";
import { useJobPositionStore } from "~/stores/settings/job-position.store";
import {
  JobPosition,
  JobRole,
  QueryJobPositions,
} from "~/interfaces/settings/job-position.interface";
import { newJobRoleSchema } from "~/utils/schemas/settings/job-position.schema";

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
      nodes: [] as JobPosition[],
      columns: [
        {
          field: "role",
          header: "Cargo",
          sortable: true,
          hasFilter: true,
        },
        {
          field: "employeesCount",
          header: "Colaboradores",
          sortable: false,
          hasFilter: false,
        },
        {
          field: "cbo",
          header: "CBO",
          sortable: false,
          hasFilter: false,
        },
      ],
      queries: {
        page: 1,
        limit: 2,
        global: { value: "", matchMode: "" },
        role: { value: "", matchMode: "" },
        employeesCount: { value: "", matchMode: "" },
        cbo: { value: "", matchMode: "" },
      },
      filters: {
        role: {
          field: "role",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        employeesCount: {
          field: "employeesCount",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        cbo: {
          field: "cbo",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },

      dialogLoading: false,
      selectedItem: {} as JobPosition,
    };
  },
  computed: {
    ...mapState(useJobPositionStore, ["total", "roles"]),
    formSchema() {
      return newJobRoleSchema;
    },
  },
  created() {
    this.getTableValues(this.queries);
  },
  methods: {
    ...mapActions(useJobPositionStore, [
      "getJobPositions",
      "saveJobPositions",
      "deleteJobPosition",
    ]),
    toggleAddDialog() {
      this.toggleAddDialogVisibility();
    },
    saveJobRole(values: JobRole) {
      if (!values.roleName) return;

      this.dialogLoading = true;

      setTimeout(() => {
        this.saveJobPositions(values)
          .then(() => {
            this.nodes = this.roles;
            this.totalPages = this.total;
            this.getToast("success");
          })
          .catch(() => this.getToast("error"));

        this.toggleAddDialog();
        this.dialogLoading = false;
      }, 1000);
    },
    cancelSubmit() {
      this.toggleAddDialog();
    },
    handleEditing(itemToEdit: JobPosition) {
      this.toggleDeleteDialogVisibility();
      this.logSelectedItem(itemToEdit);
    },
    handleDeleteDialog(itemToDelete: JobPosition) {
      this.toggleDeleteDialogVisibility();
      this.selectedItem = itemToDelete;
    },
    deleteJobRole() {
      this.dialogLoading = true;

      this.deleteJobPosition(this.selectedItem)
        .then(() => this.getToast("success"))
        .catch(() => this.getToast("error"));

      this.dialogLoading = false;
      this.toggleDeleteDialogVisibility();
    },
    logSelectedItem(data: JobPosition) {
      this.selectedItem = { ...data };
      this.toggleAddDialogVisibility();
    },
    changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      this.getTableValues(this.queries);
    },
    getTableValues(queryParams: QueryJobPositions) {
      this.loading = true;

      setTimeout(() => {
        this.getJobPositions(queryParams)
          .then(() => {
            this.nodes = this.roles;
            this.totalPages = this.total;
          })
          .catch(() => this.getToast("error"));

        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.add-dialog {
  // width: 800px;
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
