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
            icon="pi-trash"
            tooltip-text="Excluir"
            :data="{ slotData }"
            @action-handler="logSelectedItem"
          />
        </template>
      </BaseTable>
    </div>

    <BaseDialog
      :is-visible="isAddDialogVisible"
      title="Cadastrar cargo"
      :toggle-dialog="toggleAddDialogVisibility"
    >
      <div class="add-dialog">
        <p class="body__secondary">Insira o nome do cargo a ser criado</p>

        <VeeForm
          v-slot="{ values, meta }"
          as="div"
          :initial-values="newRole"
          :validation-schema="formSchema"
        >
          <pre>{{ values }}</pre>
          <!--          <pre>{{ meta }}</pre>-->

          <form
            class="add-dialog__form-container"
            @change="handleChange(values, meta)"
          >
            <pre>meta: {{ meta }}</pre>
            <div class="add-dialog__form">
              <label>
                <span class="caption__primary">Nome do cargo</span>
                <BaseInputText
                  name="roleName"
                  placeholder="Insira o nome do cargo"
                />
              </label>

              <label>
                <span class="caption__primary">CBO (opcional)</span>
                <BaseInputMask
                  name="cbo"
                  mask="9999?-99"
                  placeholder="Pesquisar CBO"
                />
              </label>
            </div>

            <div class="add-dialog__form--btn-group">
              <BaseButton
                class="btn__primary--outlined"
                label="Cancelar"
                :disabled="addRoleLoadingDialog"
                @click="toggleDialog"
              />
              <BaseButton
                class="btn__primary"
                label="Cadastrar"
                :loading="addRoleLoadingDialog"
                :disabled="(!meta.valid && meta.dirty) || addRoleLoadingDialog"
                @click="saveJobRole"
              />
            </div>
          </form>
        </VeeForm>
      </div>
    </BaseDialog>
  </BaseCard>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PageState } from "primevue/paginator";
import { mapActions, mapState } from "pinia";
import { FormMeta, GenericObject } from "vee-validate";
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

    return {
      getToast,
      isAddDialogVisible,
      toggleAddDialogVisibility,
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

      addRoleLoadingDialog: false,
      validForm: false,
      newRole: {
        roleName: "",
        cbo: "",
      },
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
    ...mapActions(useJobPositionStore, ["getJobPositions", "saveJobPositions"]),
    // Add new role dialog
    toggleDialog() {
      this.toggleAddDialogVisibility();
      this.newRole = { roleName: "", cbo: "" };
    },
    handleChange(values: JobRole, meta: FormMeta<GenericObject>) {
      this.newRole = values;
      this.validForm = meta.valid;
    },
    saveJobRole() {
      if (!this.newRole.roleName) return;

      this.addRoleLoadingDialog = true;

      setTimeout(() => {
        this.saveJobPositions(this.newRole)
          .then(() => {
            this.nodes = this.roles;
            this.totalPages = this.total;
            this.getToast("success");
          })
          .catch(() => this.getToast("error"))
          .finally(() => this.toggleDialog());

        this.addRoleLoadingDialog = false;
      }, 1000);
    },
    // Table
    logSelectedItem(data: JobPosition) {
      this.toggleAddDialogVisibility();
      this.newRole = { roleName: data.role, cbo: data.cbo };
    },
    changePageHandler(currentPage: PageState) {
      this.queries.page = currentPage.page + 1;
      this.getTableValues(this.queries);
    },
    getTableValues(queryParams: QueryJobPositions) {
      this.loading = true;

      this.getJobPositions(queryParams)
        .then(() => {
          this.nodes = this.roles;
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
</style>
