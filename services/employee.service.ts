import { Employee } from "~/interfaces/employee/employee.interface";
import api from "~/services/api.service";

type EmployeeResponse = {
  employee: Employee;
};

class EmployeeService {
  getEmployeeData(employeeId: string) {
    return api().get<EmployeeResponse>(`/employee/${employeeId}`);
  }

  getRegisteredClocks() {
    return api().get("/employee/id/clocks");
  }
}

export default new EmployeeService();
