import yup from "~/utils/validator";

const onlyNumRegex = /^[0-9]+$/;
const onlyNumMsg = "Insira um número válido";

export const clocksSettingsSchema = yup.object({
  extra1: yup
    .string()
    .required()
    .min(1)
    .max(3)
    .matches(onlyNumRegex, onlyNumMsg),
  extra2: yup
    .string()
    .required()
    .min(1)
    .max(3)
    .matches(onlyNumRegex, onlyNumMsg),
  extra3: yup
    .string()
    .required()
    .min(1)
    .max(3)
    .matches(onlyNumRegex, onlyNumMsg),
  extra4: yup
    .string()
    .required()
    .min(1)
    .max(3)
    .matches(onlyNumRegex, onlyNumMsg),
});
