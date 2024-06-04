import { phoneRegex } from "../regex";
import yup from "~/utils/validator";
import { validateCPF } from "~/utils/validators";

export const registerEmpSchema = yup.object({
  name: yup.string().required().min(3).max(255),
  rg: yup.string(),
  cpf: yup
    .string()
    .required()
    .test({
      name: "validate-cpf",
      test(value: string) {
        return validateCPF(value);
      },
    }),
  phone: yup.string().required().min(15).matches(phoneRegex, "Número inválido"),
  department: yup.string().required().max(255),
  role: yup.string().required().max(255),
});
