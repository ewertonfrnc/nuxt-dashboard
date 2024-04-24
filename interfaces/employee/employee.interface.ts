import { FilterQueries } from "../table.interface";
import { Request } from "~/interfaces/time-sheet/time-sheet.interface";

export type EmployeeClocks = {
  date: string;
  currentBalance: string;
  firstCheckIn: string;
  lastCheckOut: string;
  dayStatus: string;
  requests: Request[];
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
