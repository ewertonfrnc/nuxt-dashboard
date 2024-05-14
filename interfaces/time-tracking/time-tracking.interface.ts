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

export type QueryClockClosingDetails = {
  page: number;
  limit: number;
  global: FilterQueries;
  name: FilterQueries;
  role: FilterQueries;
  status: FilterQueries;
};

export type ClockClosing = {
  id: string;
  period: string;
  employeesCount: number;
  status: string;
  pendingSignature: boolean;
  pdfUrl: string;
};

export type TimeTrackingPeriod = {
  start: string;
  final: string;
};
