import { FilterQueries } from "../table.interface";

export type QueryOpenClockClosings = {
  page: number;
  limit: number;
  global: FilterQueries;
  id: FilterQueries;
  period: FilterQueries;
  employeesCount: FilterQueries;
  status: FilterQueries;
};
