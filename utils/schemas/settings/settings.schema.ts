import yup from "~/utils/validator";
import { onlyNumRegex, onlyNumMsg } from "~/utils/schemas/regex";

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
