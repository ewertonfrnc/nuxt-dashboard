export const routes = [
  {
    label: "Visão Geral",
    items: [
      {
        label: "Resumo",
        icon: "pi pi-home",
        route: "/",
      },
      {
        label: "Pontos",
        icon: "pi pi-clock",
        route: "/time-sheet",
      },
      {
        label: "Fechamento de ponto",
        icon: "pi pi-check-square",
        route: "/time-tracking",
      },
      {
        label: "Colaboradores",
        icon: "pi pi-users",
        route: "/employees",
      },
    ],
  },
  {
    label: "Configurações",
    items: [
      {
        label: "Cadastros",
        icon: "pi pi-plus-circle",
        items: [
          {
            label: "Empresa",
            icon: "pi pi-building",
            route: "/company",
          },
          {
            label: "Colaboradores",
            icon: "pi pi-users",
            route: "/employees",
          },
          {
            label: "Cargos",
            icon: "pi pi-id-card",
            route: "/job-positions",
          },
          {
            label: "Departamentos",
            icon: "pi pi-sitemap",
            route: "/departments",
          },
        ],
      },
      {
        label: "Parâmetros de ponto",
        icon: "pi pi-clock",
        route: "/",
      },
    ],
  },
];
