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

export const workInfoSchema = yup.object({
  admissionDate: yup
    .string()
    .matches(
      /^(?!([0-9])\1\/([0-9])\2\/([0-9])\3)\d{2}\/\d{2}\/\d{4}$/,
      "Data inválida",
    ),
  hoursPerWeek: yup.string(),
  ctps: yup.string(),
  pis: yup.string(),
  companyTime: yup.string(),
  shift: yup.string(),
});

export const schoolFormSchema = yup.object({
  course: yup.string().matches(/^[^\d]*$/, "Somente letras são permitidas"),
  educationalInstitution: yup
    .string()
    .matches(/^[^\d]*$/, "Somente letras são permitidas"),
});
