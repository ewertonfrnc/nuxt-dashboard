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

export type EmployeeAdjusts = {
  id: number;
  dateToAdjust: string;
  requestDate: string;
  status: string;
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

export type AdjustQueryParams = {
  page: number;
  limit: number;
  global: FilterQueries;
  dateToAdjust: FilterQueries;
  requestDate: FilterQueries;
  status: FilterQueries;
};

export type AdjustClocks = {
  [key: string]: string;
};
