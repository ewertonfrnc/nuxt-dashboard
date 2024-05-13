<template>
  <div class="table__container">
    <div v-if="download" class="table__download">
      <BaseButton
        class="btn__primary"
        icon="pi pi-download"
        label="Baixar fechamento em .CSV"
        @click="$refs.dt.exportCSV()"
      />
    </div>

    <DataTable
      ref="dt"
      :expanded-rows="expandedRows"
      :filters="filters"
      :global-filter-fields="['name']"
      :has-action="hasAction"
      :loading="loading"
      :pt="{
        table: 'table',
        thead: 'table__header',
        tbody: 'table__body',
        bodyrow: 'table__body--row',
        rowExpansionCell: 'table__expansion',
        loadingOverlay: 'hidden',
      }"
      :selection="selectedEmployees"
      :value="seeOnlySelectedFields ? selectedEmployees : nodes"
      data-key="id"
      filter-display="menu"
      removable-sort
      scroll-direction="horizontal"
      scroll-height="flex"
      scrollable
      select-all
      select-all-change
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
      @select-all-change="selectAllHandler"
      @row-expand="onRowExpand"
      @row-collapse="onRowCollapse"
      @update:filters="updateFilterHandler"
    >
      <template v-if="!loading && headerShown" #header>
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
              class="btn__primary--outlined"
              icon="pi pi-filter-slash"
              label="Limpar filtro"
              @click="clearFilters"
            />

            <label>
              <i class="pi pi-search"></i>
              <input
                v-model="filters['global'].value"
                placeholder="Procurar por nome"
              />
            </label>
          </div>
        </div>
      </template>

      <template v-if="!loading && !nodes.length" #empty>
        <div class="table__empty">
          <img
            v-if="colorMode.preference === 'light'"
            alt="no entries illustration"
            src="~/assets/img/empty-light.png"
          />
          <img
            v-else
            alt="no entries illustration"
            src="~/assets/img/empty-dark.png"
          />

          <h5 class="heading__quinary">Não há nada aqui por enquanto...</h5>
        </div>
      </template>

      <div v-if="loading" class="table__loading">
        <UiActivityIndicator size="large" />
      </div>

      <Column
        v-if="!loading && isSelectable"
        :pt="{
          checkboxwrapper: 'checkbox__wrapper',
          headercheckboxwrapper: 'checkbox__wrapper',
          headercell: 'table__header--cell',
          bodycell: 'table__body--cell table__body--cell-icon',
        }"
        selection-mode="multiple"
      />

      <Column
        v-if="!loading && isExpandable"
        :pt="{
          headercell: 'table__header--cell',
          headercontent: 'table__header--content',
          bodycell: 'table__body--cell table__body--cell-icon',
        }"
        expander
      >
        <template #header>
          <span class="heading__quinary">Ações</span>
        </template>
      </Column>

      <Column
        v-for="col of columns"
        v-if="!loading && nodes.length"
        :key="col.field"
        :field="col.field"
        :filter-field="col.field"
        :frozen="col.frozen"
        :header="col.header"
        :pt="{
          headercell: `table__header--cell ${
            col.frozen && 'table__header--frozen-cell'
          }`,
          headertitle: 'heading__quinary mr-auto	',
          headercontent: 'table__header--content',
          bodycell: `table__body--cell ${
            col.frozen && 'table__body--frozen-cell'
          }`,
          filteraddrule: 'filter__add-rule',
          filterConstraints: 'table__filter',
          filtermenubutton: 'table__filter--icon',
          filterbuttonbar: 'table__filter--footer',
          sort: '',
        }"
        :show-add-button="false"
        :show-filter-match-modes="false"
        :show-filter-menu="true"
        :show-filter-operator="false"
        :sortable="col.sortable"
      >
        <template #body="{ data, field }">
          <slot :data="data" :field="field" name="body-cell" />
        </template>

        <template #sorticon="{ sortOrder }">
          <div class="table__sort">
            <i
              :class="[
                'caption__primary pi',
                sortOrder === 0
                  ? 'pi-sort-alt'
                  : sortOrder === 1
                  ? 'pi-sort-amount-down-alt'
                  : 'pi-sort-amount-down',
              ]"
            />
          </div>
        </template>
        <template #filtericon>
          <i class="pi pi-filter"></i>
        </template>

        <template v-if="col.hasFilter" #filter="{ filterModel }">
          <input
            v-model="filterModel.value"
            class="filter__input"
            placeholder="Filtrar por"
            type="text"
          />
          <BaseListbox
            :on-update-handler="filterOptionsHandler"
            :options="filterOption"
          />
        </template>

        <template #filterclear="{ filterCallback }">
          <BaseButton
            class="btn__primary--outlined"
            label="Limpar"
            @click="filterCallback"
          />
        </template>

        <template #filterapply="{ filterCallback, field }">
          <BaseButton
            class="btn__primary"
            label="Filtrar"
            @click="
              () => {
                changeFilter(field);
                filterCallback();
              }
            "
          />
        </template>
      </Column>

      <Column
        v-if="!loading && nodes.length && hasAction"
        :pt="{
          headercell: 'table__header--cell',
          bodycell: 'table__body--cell',
          headercontent: 'table__header-content',
        }"
        style="min-width: 2rem"
      >
        <template #header>
          <slot name="column-header" />
        </template>

        <template #body="{ data }">
          <div class="table__action">
            <slot :data="data" name="column-action" />
          </div>
        </template>
      </Column>

      <template #footer>
        <div v-if="nodes.length" class="table__footer">
          <Paginator
            :pt="{
              root: 'paginator',
              pages: 'paginator__pages',
              pageButton: 'paginator__button caption__primary',
              previousPageButton: ({ context }) => {
                return `paginator__button ${
                  context.disabled && 'paginator__button--disabled'
                }`;
              },
              nextPageButton: ({ context }) => {
                return `paginator__button ${
                  context.disabled && 'paginator__button--disabled'
                }`;
              },
              lastPageButton: ({ context }) => {
                return `paginator__button ${
                  context.disabled && 'paginator__button--disabled'
                }`;
              },
              firstPageButton: ({ context }) => {
                return `paginator__button ${
                  context.disabled && 'paginator__button--disabled'
                }`;
              },
            }"
            :rows="rows"
            :total-records="totalPages"
            @page="(pageState) => changePage(pageState)"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import { FilterMatchMode } from "primevue/api";
import {
  DataTableRowExpandEvent,
  DataTableRowSelectEvent,
} from "primevue/datatable";
import { PageState } from "primevue/paginator";
import {
  FilterOption,
  Filters,
  TableColumn,
} from "~/interfaces/table.interface";

export default {
  props: {
    columns: { type: Array as PropType<TableColumn[]>, required: true },
    nodes: { type: Array, required: true },
    loading: { type: Boolean, required: false, default: false },
    sortable: { type: Boolean, required: false, default: true },
    paginator: { type: Boolean, required: false, default: true },
    rows: { type: Number, required: false, default: 10 },
    headerShown: { type: Boolean, required: false, default: false },
    isSelectable: { type: Boolean, required: false, default: false },
    isExpandable: { type: Boolean, required: false, default: false },
    hasAction: { type: Boolean, required: false, default: false },
    download: { type: Boolean, required: false, default: false },
    totalPages: { type: Number, default: 0, required: false },
    customFilters: { type: Object, default: () => {}, required: true },
  },
  emits: ["update-filter-handler", "change-page"],
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  data() {
    return {
      filters: {},
      selectedOption: { label: "", code: "" },
      selectedFilterField: "",
      filterOption: [
        { label: "Contém", code: FilterMatchMode.CONTAINS },
        { label: "Não contém", code: FilterMatchMode.NOT_CONTAINS },
        { label: "Igual", code: FilterMatchMode.EQUALS },
        { label: "Começa com", code: FilterMatchMode.STARTS_WITH },
        { label: "Termina com", code: FilterMatchMode.ENDS_WITH },
        { label: "Exceto", code: FilterMatchMode.NOT_EQUALS },
      ],

      // Row selection
      selectAllCheckbox: null,
      selectedEmployees: [],
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
      };
      this.filters = { ...this.filters, ...this.customFilters };
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
    updateFilterHandler(updatedFilters: Filters) {
      if (!this.selectedOption || !this.selectedFilterField) return;

      updatedFilters[this.selectedFilterField as keyof Filters].matchMode =
        this.selectedOption.code;

      this.filters = updatedFilters;
      this.$emit("update-filter-handler", this.filters);
    },
    changePage(pageState: PageState) {
      this.$emit("change-page", pageState);
    },
  },
};
</script>
