import { FilterQueries } from "~/interfaces/table.interface";

export type JobPosition = {
  role: string;
  employeesCount: number;
  cbo: string;
};

export type QueryJobPositions = {
  page: number;
  limit: number;
  global: FilterQueries;
  role: FilterQueries;
  employeesCount: FilterQueries;
  cbo: FilterQueries;
};

export type JobRole = {
  roleName: string;
  cbo: string;
};
