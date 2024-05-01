import { RouteItem } from "~/interfaces/routes.interface";

export const routes: RouteItem[] = [
  {
    label: "Visão Geral",
    route: "",
    items: [
      {
        label: "Indicadores",
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
    route: "",
    items: [
      {
        label: "Cadastros",
        icon: "pi pi-plus-circle",
        route: "",
        items: [
          {
            label: "Colaboradores",
            icon: "pi pi-users",
            route: "/register-employees",
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
        route: "/clock-config",
      },
    ],
  },
];

export function findRouteAndLabel(
  menuItems: RouteItem[],
  path: string,
): RouteItem {
  let result: RouteItem = { route: "", label: "" };

  menuItems.forEach((menuItem) => {
    if (!menuItem) return;

    if (menuItem.items) {
      const foundItem = menuItem.items.find(
        (subItem) => subItem.route === path,
      );
      if (foundItem && foundItem.label !== "Cadastros") {
        result = { route: foundItem.route, label: foundItem.label };
      }

      const [subMenuItems] = menuItem.items;
      if (subMenuItems.items) {
        const foundItem = subMenuItems.items.find(
          (subItem) => subItem.route === path,
        );

        if (foundItem)
          result = { route: foundItem.route, label: foundItem.label };
      }
    }
  });

  return result;
}
