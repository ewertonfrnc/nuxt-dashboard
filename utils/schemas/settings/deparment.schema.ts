import yup from "~/utils/validator";

export const departmentSchema = yup.object({
  name: yup.string().required().min(3).max(255),
});
