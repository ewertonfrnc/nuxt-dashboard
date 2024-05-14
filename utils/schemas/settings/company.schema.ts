import yup from "~/utils/validator";
import { cepRegex } from "~/utils/schemas/regex";

export const companyFormSchema = yup.object().shape({
  name: yup.string().required().min(3).max(255),
  legalName: yup.string().required().min(3).max(255),
  cep: yup.string().required().max(9).matches(cepRegex, "CEP inválido"),
  street: yup.string().required().min(5).max(255),
  houseNumber: yup.string().required().min(5).max(255),
  additionalAddressDetails: yup.string().max(128),
});
