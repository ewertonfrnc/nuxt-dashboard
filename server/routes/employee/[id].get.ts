export default defineEventHandler((event) => {
  return {
    status: "success",
    employee: {
      id: 1000,
      name: "Ana Maria Martins Rocha",
      role: "Nutricionista",
      photo: "https://randomuser.me/api/portraits/women/92.jpg",
    },
  };
});
