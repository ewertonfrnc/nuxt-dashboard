export type FilterOption = {
  label: string;
  code: string;
};

export type Filters = {
  global: { field: string; value: null; matchMode: string };
  name: { field: string; value: null; matchMode: string };
  currentBalance: { field: string; value: null; matchMode: string };
  totalRequests: { field: string; value: null; matchMode: string };
};
