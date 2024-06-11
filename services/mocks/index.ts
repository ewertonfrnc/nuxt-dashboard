import { authMock } from "./auth.mock";
import { homeMock } from "./home.mock";
import { timeSheet } from "./time-sheet.mock";
import { employeesMock } from "./employees.mock";
import { employeeMock } from "./employee.mock";
import { timeTrackingMock } from "./time-tracking.mock";
import { clockConfigMock } from "./clock-config.mock";
import { companyMock } from "./company.mock";
import { jobPositionMock } from "~/services/mocks/job-position.mock";
import { departmentsMock } from "~/services/mocks/departments.mock";
import { shiftsMock } from "~/services/mocks/shifts.mock";
import { RegisterMock } from "./register.mock";

const mockTypes = {
  auth: authMock,
  home: homeMock,
  timeSheet,
  employees: employeesMock,
  employee: employeeMock,
  timeTracking: timeTrackingMock,
  clockConfig: clockConfigMock,
  company: companyMock,
  jobs: jobPositionMock,
  departments: departmentsMock,
  shifts: shiftsMock,
  register: RegisterMock,
};

export const getResponse = (
  request: string,
  mockType: keyof typeof mockTypes,
) => {
  return new Promise((resolve, reject) => {
    const mock = mockTypes[mockType][request];
    console.log(`${mockType}: ${request}`, mock);

    if (!mock) {
      reject(new Error("Falha na operação. Tente novamente mais tarde!"));
    }

    resolve(mock);
  });
};
