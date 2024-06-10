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
  url,
} from "@vee-validate/rules";
import { validateCPF } from "~/utils/validators";
import { cepRegex, dateRegex, phoneRegex } from "~/utils/schemas/regex";

export type ErrorMessages = { [key: string]: string };

export default defineNuxtPlugin(() => {
  defineRule("min", min);
  defineRule("max", max);
  defineRule("url", url);
  defineRule("email", email);
  defineRule("required", required);
  defineRule("min_value", minValue);
  defineRule("max_value", maxValue);
  defineRule("passwords_mismatch", confirmed);
  defineRule("alpha_spaces", alphaSpaces);
  defineRule("cpf", (value: string) =>
    !validateCPF(value) ? "CPF inválido" : true,
  );
  defineRule("phone", (value: string) =>
    !phoneRegex.test(value) ? "Número inválido." : true,
  );
  defineRule("date", (value: string) =>
    !dateRegex.test(value) ? "Data inválida." : true,
  );
  defineRule("cep", (value: string) =>
    !cepRegex.test(value) ? "CEP inválido." : true,
  );

  configure({
    generateMessage: (context): string => {
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
