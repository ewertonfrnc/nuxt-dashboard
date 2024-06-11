import { DateTime } from "luxon";
import yup from "~/utils/validator";

export const shiftSchema = yup.object({
  start: yup
    .string()
    .required()
    .test("is-lower", "Intervalo inválido", function (value) {
      const { end } = this.parent;
      return (
        DateTime.fromFormat(value, "HH:mm").toMillis() <
        DateTime.fromFormat(end, "HH:mm").toMillis()
      );
    }),
  end: yup
    .string()
    .required()
    .test("is-greater", "Intervalo inválido", function (value) {
      const { start } = this.parent;
      return (
        DateTime.fromFormat(value, "HH:mm").toMillis() >
        DateTime.fromFormat(start, "HH:mm").toMillis()
      );
    }),
});
