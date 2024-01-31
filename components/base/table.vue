<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import {
  DataTableFilterMeta,
  DataTableRowExpandEvent,
  DataTableRowSelectEvent,
} from "primevue/datatable";

export default {
  props: {
    columns: { type: Array, required: true },
    nodes: { type: Array, required: true },
    loading: { type: Boolean, required: false, default: false },
    sortable: { type: Boolean, required: false, default: true },
    paginator: { type: Boolean, required: false, default: true },
    rows: { type: Number, required: false, default: 10 },
    headerShown: { type: Boolean, required: false, default: false },
    isSelectable: { type: Boolean, required: false, default: false },
    isExpandable: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      filters: null,
      selectedOption: { label: "", code: "" },
      selectedFilterField: "",
      filterOption: [
        { label: "Começa com", code: FilterMatchMode.STARTS_WITH },
        { label: "Contém", code: FilterMatchMode.CONTAINS },
        { label: "Não contém", code: FilterMatchMode.NOT_CONTAINS },
        { label: "Termina com", code: FilterMatchMode.ENDS_WITH },
        { label: "Igual", code: FilterMatchMode.EQUALS },
        { label: "Exceto", code: FilterMatchMode.NOT_EQUALS },
      ],

      // Row selection
      selectAllCheckbox: null,
      selectedEmployees: null,
      seeOnlySelectedFields: false,

      // Row Expansion
      expandedRows: [],
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
    if (this.isSelectable) {
      this.selectAllCheckbox = document.querySelector(
        '[data-pc-section="headercheckboxwrapper"] .p-hidden-accessible',
      )?.children[0];

      if (this.selectAllCheckbox)
        this.selectAllCheckbox.ariaLabel = "All items unselected";
    }
  },
  updated() {
    if (this.isSelectable && this.selectAllCheckbox) {
      this.selectAllCheckbox.ariaLabel =
        this.selectedEmployees?.length !== this.nodes.length
          ? "All items unselected"
          : "All items selected";
    }
  },
  methods: {
    clearFilters() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: {
          field: "global",
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        firstName: {
          field: "firstName",
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        age: {
          field: "age",
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        },
      };
    },
    selectAllHandler() {
      this.selectedEmployees =
        this.selectedEmployees?.length !== this.nodes.length ? this.nodes : [];
    },
    onRowSelect(event: DataTableRowSelectEvent) {
      this.selectedEmployees = [...this.selectedEmployees, event.data];
    },
    onRowUnselect(event: DataTableRowSelectEvent) {
      this.selectedEmployees = this.selectedEmployees?.filter(
        (employee) => employee.id !== event.data.id,
      );
    },
    toggleValueItems() {
      this.seeOnlySelectedFields = !this.seeOnlySelectedFields;
    },
    onRowExpand(event: DataTableRowExpandEvent) {
      this.expandedRows = [...this.expandedRows, event.data];
    },
    onRowCollapse(event: DataTableRowExpandEvent) {
      this.expandedRows = this.expandedRows?.filter(
        (row) => row.id !== event.data.id,
      );
    },
    changeFilter(field: string) {
      this.selectedFilterField = field;
    },
    filterOptionsHandler(value: FilterOption) {
      this.selectedOption = value;
    },
    updateFilterHandler(updatedFilters: DataTableFilterMeta) {
      if (!this.selectedOption) return;

      updatedFilters[this.selectedFilterField].matchMode =
        this.selectedOption.code;

      this.filters = updatedFilters;
    },
  },
};
</script>

<template>
  <DataTable
    removable-sort
    :value="seeOnlySelectedFields ? selectedEmployees : nodes"
    :paginator="paginator"
    :rows="rows"
    :filters="filters"
    filter-display="menu"
    :global-filter-fields="['firstName']"
    :loading="loading"
    :selection="selectedEmployees"
    data-key="id"
    select-all
    select-all-change
    :expanded-rows="expandedRows"
    :pt="{
      table: 'table',
      thead: 'table__header',
      tbody: 'table__body',
      bodyrow: 'table__body--row',
      rowExpansionCell: 'table__expansion',
    }"
    @row-select="onRowSelect"
    @row-unselect="onRowUnselect"
    @select-all-change="selectAllHandler"
    @row-expand="onRowExpand"
    @row-collapse="onRowCollapse"
    @update:filters="updateFilterHandler"
  >
    <template v-if="headerShown" #header>
      <div
        :class="[
          selectedEmployees?.length
            ? 'table__header--options-selection'
            : 'table__header--options',
        ]"
      >
        <BaseButton
          v-if="isSelectable && selectedEmployees?.length"
          :label="`Ver ${selectedEmployees?.length} selecionados`"
          class="btn__primary table__header--see-selected"
          @click="toggleValueItems"
        />

        <div class="table__header--filter">
          <BaseButton
            class="btn__secondary--outlined"
            icon="pi pi-filter-slash"
            label="Limpar"
            @click="clearFilters"
          />

          <input
            v-model="filters['global'].value"
            class="input__field"
            placeholder="Procurar por nome"
          />
        </div>
      </div>
    </template>

    <template #empty> Nenhum produto encontrado. </template>
    <template #loading> Carregando produtos. Por favor, aguarde! </template>

    <Column
      v-if="isSelectable"
      selection-mode="multiple"
      :pt="{
        checkboxwrapper: 'checkbox__wrapper',
        headercheckboxwrapper: 'checkbox__wrapper',
        headercell: 'table__header--cell',
        bodycell: 'table__body--cell',
      }"
    />

    <Column
      v-if="isExpandable"
      expander
      :pt="{
        bodycell: 'table__body--cell',
      }"
    />

    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.sortable"
      :filter-field="col.field"
      :show-filter-menu="true"
      :show-filter-match-modes="false"
      :show-filter-operator="false"
      :show-add-button="false"
      :pt="{
        headercell: 'table__header--cell',
        headercontent: 'flex justify-content-between',
        bodycell: 'table__body--cell',
        filteraddrule: 'filter__add-rule',
        filterbuttonbar: 'filter__btn-group',
      }"
    >
      <template #body="{ data, field }"> {{ data[field] }} </template>

      <template v-if="col.hasFilter" #filter="{ filterModel }">
        <input
          v-model="filterModel.value"
          type="text"
          class="filter__input"
          placeholder="Filtrar por"
        />

        <BaseListbox
          :options="filterOption"
          :on-update-handler="filterOptionsHandler"
        />
      </template>

      <template #filterclear="{ filterCallback }">
        <BaseButton
          class="btn__secondary--outlined"
          type="button"
          label="Limpar"
          @click="filterCallback"
        />
      </template>

      <template #filterapply="{ filterCallback, field }">
        <BaseButton
          class="btn__secondary"
          type="button"
          label="Filtrar"
          @click="
            () => {
              filterCallback();
              changeFilter(field);
            }
          "
        />
      </template>
    </Column>

    <template v-if="isExpandable" #expansion="slotProps">
      <BaseTableExpandedRow :slot-props="slotProps.data" />
    </template>
  </DataTable>
</template>
