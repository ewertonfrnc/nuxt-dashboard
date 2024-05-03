export default defineEventHandler((event) => {
  return {
    total: 6,
    adjusts: [
      {
        id: 1,
        dateToAdjust: "02/06",
        requestDate: "01/02/1990",
        status: "Pendente",
      },
    ],
  };
});
