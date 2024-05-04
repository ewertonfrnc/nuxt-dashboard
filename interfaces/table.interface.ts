export type FilterOption = {
  label: string;
  code: string;
};

export type FilterQueries = { value: string; matchMode: string };

export type Filter = {
  field: string;
  value: null;
  matchMode: string;
};

export type Filters = {
  global: Filter;
  name: Filter;
  currentBalance: Filter;
  totalRequests: Filter;
};

export type TableColumn = {
  field: string;
  header: string;
  sortable: boolean;
  hasFilter: boolean;
};
