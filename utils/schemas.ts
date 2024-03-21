import yup from "~/utils/validator";

export const recoverPassword = yup.object({
  username: yup.string().required().min(3).trim(),
});

export const loginSchema = yup.object({
  username: yup.string().required().min(3).trim(),
  password: yup.string().required().min(3),
});

export const contactInfoSchema = yup.object({
  email: yup.string().required().email(),
  phone: yup.string().required(),
  emergencyPhone: yup.string().required(),
  emergencyContact: yup.string().required(),
  cep: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  linkedinURL: yup.string().required(),
  select: yup
    .object()
    .shape({
      name: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable(),
});
