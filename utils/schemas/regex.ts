// Only numbers
export const onlyNumRegex = /^[0-9]+$/;
export const onlyNumMsg = "Insira um número válido";

export const dateRegex =
  /^(?!([0-9])\1\/([0-9])\2\/([0-9])\3)\d{2}\/\d{2}\/\d{4}$/;
export const phoneRegex = /^(?!.*_).*$/;
export const cepRegex = /^(?!(\d)\1{4}-?(\d)\2{2})\d{5}-?\d{3}$/;
export const PISRegex =
  /^(?!(\d)\1{2}\.\1{5}\.\1{2}-\1)\d{3}\.\d{5}\.\d{2}-\d$/;
export const CTPSRegex = /^(?!(\d)\1{4}-\1{4}-\1{2}$)\d{5}-\d{4}-[A-Z]{2}$/;
export const noNumRegex = /^[^\d]*$/;
export const cnpjRegex = /^(?:(\d)\1{13}|(\d{3})\2{4}|(\d{4})\3{2})-\d{2}$ /;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
