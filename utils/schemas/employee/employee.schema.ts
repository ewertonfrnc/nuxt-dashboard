import yup from "~/utils/validator";

const dateRegex = /^(?!([0-9])\1\/([0-9])\2\/([0-9])\3)\d{2}\/\d{2}\/\d{4}$/;

export const clockSchema = yup.object({
  checkin: yup.string().required().min(3).trim(),
  checkout: yup.string().required().min(3).trim(),
});

export const employeeDataSchema = yup.object({
  fullname: yup.string().required(),
  birthDate: yup.string().matches(dateRegex, "Data inválida"),
});
