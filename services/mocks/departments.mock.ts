export const departmentsMock = {
  getDepartments: {
    total: 3,
    departments: [
      {
        department: "Não definido",
        employeesCount: 0,
      },
      {
        department: "Front-end",
        employeesCount: 4,
      },
      {
        department: "Design",
        employeesCount: 2,
      },
    ],
  },
  saveDepartments: {
    total: 4,
    departments: [
      {
        department: "Não definido",
        employeesCount: 0,
      },
      {
        department: "Front-end",
        employeesCount: 4,
      },
      {
        department: "Design",
        employeesCount: 2,
      },
      {
        department: "Back-end",
        employeesCount: 10,
      },
    ],
  },
  deleteDepartments: { message: "success" },
};
