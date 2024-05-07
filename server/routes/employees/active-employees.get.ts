function paginate(array, page: string, limit: string) {
  const initialIdx = (+page - 1) * +limit;
  const finalIdx = initialIdx + +limit;
  return array.slice(initialIdx, finalIdx);
}

export default defineEventHandler((event) => {
  const { page, limit } = getQuery(event);

  const employees = [
    {
      id: 1000,
      name: "Ana Maria Carla",
      role: "Desenvolvedor iOS",
      department: "iOS",
      workType: "Presencial",
      status: "Trabalhando",
    },
    {
      id: 1001,
      name: "João da Silva",
      role: "Desenvolvedor Web",
      department: "Web Development",
      workType: "Remoto",
      status: "Trabalhando",
    },
    {
      id: 1002,
      name: "Maria Oliveira",
      role: "Engenheira de Dados",
      department: "Data Engineering",
      workType: "Presencial",
      status: "Não trabalhando",
    },
    {
      id: 1003,
      name: "Pedro Almeida",
      role: "Analista de Negócios",
      department: "Business Analysis",
      workType: "Remoto",
      status: "Não trabalhando",
    },
    {
      id: 1004,
      name: "Juliana Santos",
      role: "Designer UX/UI",
      department: "Design",
      workType: "Presencial",
      status: "Trabalhando",
    },
    {
      id: 1005,
      name: "Rafael Sousa",
      role: "Engenheiro de Software",
      department: "Software Engineering",
      workType: "Remoto",
      status: "Trabalhando",
    },
    {
      id: 1006,
      name: "Amanda Costa",
      role: "Gerente de Projetos",
      department: "Project Management",
      workType: "Presencial",
      status: "Trabalhando",
    },
    {
      id: 1007,
      name: "Lucas Oliveira",
      role: "Desenvolvedor Front-end",
      department: "Front-end Development",
      workType: "Remoto",
      status: "Não trabalhando",
    },
    {
      id: 1008,
      name: "Camila Santos",
      role: "Analista de Sistemas",
      department: "Systems Analysis",
      workType: "Presencial",
      status: "Trabalhando",
    },
    {
      id: 1009,
      name: "Fernando Costa",
      role: "Analista de Dados",
      department: "Data Analysis",
      workType: "Remoto",
      status: "Não trabalhando",
    },
    {
      id: 1010,
      name: "Patrícia Lima",
      role: "Scrum Master",
      department: "Agile",
      workType: "Presencial",
      status: "Não trabalhando",
    },
    {
      id: 1011,
      name: "Roberto Pereira",
      role: "Desenvolvedor Full-stack",
      department: "Full-stack Development",
      workType: "Remoto",
      status: "Trabalhando",
    },
    {
      id: 1012,
      name: "Carolina Oliveira",
      role: "Product Manager",
      department: "Product Management",
      workType: "Presencial",
      status: "Trabalhando",
    },
    {
      id: 1013,
      name: "André Santos",
      role: "QA Engineer",
      department: "Quality Assurance",
      workType: "Remoto",
      status: "Não trabalhando",
    },
    {
      id: 1014,
      name: "Mariana Silva",
      role: "Analista de Marketing",
      department: "Marketing",
      workType: "Presencial",
      status: "Não trabalhando",
    },
    {
      id: 1015,
      name: "Ricardo Pereira",
      role: "DevOps Engineer",
      department: "DevOps",
      workType: "Remoto",
      status: "Trabalhando",
    },
  ];

  const results = paginate(employees, page, limit);

  return {
    total: 15,
    employees: results,
  };
});