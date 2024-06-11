import yup from "~/utils/validator";

export const newJobRoleSchema = yup.object({
  roleName: yup.string().required().min(3).max(255),
});
