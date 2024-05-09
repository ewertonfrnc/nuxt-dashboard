import yup from "~/utils/validator";

const dateRegex = /^(?!([0-9])\1\/([0-9])\2\/([0-9])\3)\d{2}\/\d{2}\/\d{4}$/;
const phoneRegex = /^(?!.*_).*$/;
const cepRegex = /^(?!(\d)\1{4}-?(\d)\2{2})\d{5}-?\d{3}$/;
const PISRegex = /^(?!(\d)\1{2}\.\1{5}\.\1{2}-\1)\d{3}\.\d{5}\.\d{2}-\d$/;
const CTPSRegex = /^(?!(\d)\1{4}-\1{4}-\1{2}$)\d{5}-\d{4}-[A-Z]{2}$/;
const noNumRegex = /^[^\d]*$/;

export const clockSchema = yup.object({
  checkin: yup.string().required().min(3).trim(),
  checkout: yup.string().required().min(3).trim(),
});

export const employeeDataSchema = yup.object({
  fullname: yup.string().required(),
  birthDate: yup.string().matches(dateRegex, "Data inválida"),
});

export const contactFormSchema = yup.object({
  email: yup.string().required().email().min(10).max(50),
  phone: yup.string().required().min(15).matches(phoneRegex, "Número inválido"),
  cep: yup.string().required().matches(cepRegex, "CEP inválido"),
  linkedinUrl: yup.string().min(12).max(255).url(),
  emergencyNumber: yup.string().matches(phoneRegex, "Número inválido"),
  emergencyContact: yup.string().required().min(2).max(100),
  additionalAddressDetails: yup.string().max(128),
});

export const workInfoSchema = yup.object({
  admissionDate: yup.string().matches(dateRegex, "Data inválida"),
  hoursPerWeek: yup.string(),
  ctps: yup.string().required().matches(CTPSRegex, "CTPS inválido"),
  pis: yup.string().required().matches(PISRegex, "PIS inválido"),
  companyTime: yup.string().required(),
  shift: yup.string(),
});

export const schoolFormSchema = yup.object({
  course: yup
    .string()
    .required()
    .matches(noNumRegex, "Somente letras são permitidas"),
  educationalInstitution: yup
    .string()
    .required()
    .matches(noNumRegex, "Somente letras são permitidas"),
});
