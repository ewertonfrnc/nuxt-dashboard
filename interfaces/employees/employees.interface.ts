type Filter = { value: string; matchMode: string };

export type ActiveEmployeeQueryParams = {
  page: number;
  global: Filter;
  name: Filter;
  role: Filter;
  department: Filter;
  workType: Filter;
  status: Filter;
};

export type InactiveEmployeeQueryParams = {
  page: number;
  global: Filter;
  name: Filter;
  lastRole: Filter;
  hireDate: Filter;
  dismissalDate: Filter;
  workType: Filter;
};

export type Employees = {
  id: number;
  name: string;
  role: string;
  department: string;
  workType: string;
  status: string;
};
