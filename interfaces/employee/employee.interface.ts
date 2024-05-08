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

export type EmployeePersonalData = {
  fullname: string;
  nickname: string;
  rg: string;
  cpf: string;
  birthDate: string;
  birthCity: string;
  ethnicity: string;
  profileImg: string;
};

export type EmployeeContact = {
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  linkedinUrl: string;
  emergencyNumber: string;
  emergencyContact: string;
  neighborhood: string;
  houseNumber: string;
  additionalAddressDetails: string;
};

export type Employee = {
  id: number;
  name: string;
  role: string;
  photo: string;
  personalData: EmployeePersonalData;
  contact: EmployeeContact;
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

export type WorkLog = {
  date: string;
  total: string;
  negative: boolean;
  pendingFix: boolean;
  approved?: boolean;
  title: string;
  motive: string;
  beforeTotal: {
    negative: boolean;
    total: string;
  };
  afterTotal: {
    negative: boolean;
    total: string;
  };
  beforeHours: Array<{ in: string; out: string }>;
  afterHours: Array<{
    in: string;
    out: string;
    changedIn: boolean;
    changedOut: boolean;
  }>;
};

export type EmployeeAdjusts = {
  id: number;
  dateToAdjust: string;
  requestDate: string;
  status: string;
  requests: WorkLog[];
};
