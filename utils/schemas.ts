import yup from "~/utils/validator";

export const registerSchema = yup.object({
  name: yup.string().required().min(3).max(100).trim(),
  email: yup.string().required().email().trim(),
  phone: yup.string().required().min(15),
  password: yup.string().required().min(8).max(100),
  confirmPassword: yup
    .string()
    .test(
      "passwords-mismatch",
      "As senhas não são iguais.",
      function (currentValue) {
        return this.parent.password === currentValue;
      },
    ),
});

export const loginSchema = yup.object({
  username: yup.string().required().min(3).trim(),
  password: yup.string().required().min(3).max(100),
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
