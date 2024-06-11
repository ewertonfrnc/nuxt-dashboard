import { FilterQueries } from "~/interfaces/table.interface";

export type Department = {
  id: number;
  department: string;
  employeesCount: number;
};

export type QueryDepartments = {
  page: number;
  limit: number;
  global: FilterQueries;
  department: FilterQueries;
  employeesCount: FilterQueries;
};
