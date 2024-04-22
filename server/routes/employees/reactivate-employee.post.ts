export default defineEventHandler(async (event) => {
  return {
    status: "success",
    message: "Employee reactivated",
  };
});
