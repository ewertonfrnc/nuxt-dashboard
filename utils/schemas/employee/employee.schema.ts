import yup from "~/utils/validator";

export const clockSchema = yup.object({
  checkin: yup.string().required().min(3).trim(),
  checkout: yup.string().required().min(3).trim(),
});

export const contactFormSchema = yup.object({
  email: yup.string().required().email().min(10).max(50),
  phone: yup
    .string()
    .required()
    .min(15)
    .matches(/^(?!.*_).*$/, "Número inválido"),
  cep: yup
    .string()
    .required()
    .matches(/^(?!(\d)\1{4}-?(\d)\2{2})\d{5}-?\d{3}$/, "CEP inválido"),
  street: yup.string().required().min(5).max(255),
  neighborhood: yup.string().required().min(5).max(255),
  houseNumber: yup.string().required().min(5).max(255),
  linkedinUrl: yup.string().min(12).max(255).url(),
  emergencyNumber: yup.string(),
  emergencyContact: yup.string().min(2).max(100),
  additionalAddressDetails: yup.string().max(128),
});
