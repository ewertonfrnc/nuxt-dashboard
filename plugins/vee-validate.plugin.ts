/*
 * A full list os validation rules can be found here:
 * https://vee-validate.logaretm.com/v2/guide/rules.html
 */

import { configure, defineRule } from "vee-validate";
import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  required,
} from "@vee-validate/rules";

export type ErrorMessages = { [key: string]: string };

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("min", min);
  defineRule("max", max);
  defineRule("email", email);
  defineRule("required", required);
  defineRule("min_value", minValue);
  defineRule("max_value", maxValue);
  defineRule("passwords_mismatch", confirmed);
  defineRule("alpha_spaces", alphaSpaces);

  configure({
    generateMessage: (context): string => {
      console.log(context);
      const messages: ErrorMessages = {
        min: `O valor inserido é muito curto.`,
        max: `O valor inserido é muito longo.`,
        email: `Este campo precisa de um email válido.`,
        required: `Este campo é obrigatório.`,
        min_value: `O valor está abaixo do permitido.`,
        maxValue: `O valor está acima do permitido.`,
        alpha_spaces: `Este campo permite apenas caracteres alfabéticos.`,
        passwords_mismatch: "As senhas não são iguais.",
      };

      return context.rule?.name && messages[context.rule.name]
        ? messages[context.rule.name]
        : `O campo ${context.field} é inválido.`;
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });
});
