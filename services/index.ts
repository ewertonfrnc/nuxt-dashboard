import authService from "./auth.service";
import homeService from "./home.service";
import timeSheetService from "./time-sheet.service";
import timeTrackingService from "./time-tracking.service";

import employeesService from "./employees.service";
import employeeService from "./employee.service";

import companyService from "./settings/company.service";
import clockConfigService from "./settings/clock-config.service";
import jobPositionService from "~/services/settings/job-position.service";
import departmentsService from "~/services/settings/departments.service";

export {
  authService,
  homeService,
  timeSheetService,
  employeesService,
  employeeService,
  timeTrackingService,
  clockConfigService,
  companyService,
  jobPositionService,
  departmentsService,
};
