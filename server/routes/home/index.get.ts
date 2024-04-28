export default defineEventHandler((event) => {
  return {
    status: "success",
    indicators: {
      pendingAdjustments: 5,
      collaborators: 36,
      availableClosings: 1,
      monthlyTurnover: 9.8,
      annualTurnover: 3,
    },
  };
});
