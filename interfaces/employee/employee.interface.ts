import { FilterQueries } from "../table.interface";

export type EmployeeClocks = {
  date: string;
  currentBalance: string;
  firstCheckIn: string;
  lastCheckOut: string;
  dayStatus: string;
};

export type Employee = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

export type EmployeeQueryParams = {
  page: number;
  limit: number;
  global: FilterQueries;
  date: FilterQueries;
  currentBalance: FilterQueries;
  firstCheckIn: FilterQueries;
  lastCheckOut: FilterQueries;
  dayStatus: FilterQueries;
};
