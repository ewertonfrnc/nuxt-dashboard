export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanedCPF = cpf.replace(/[^\d]/g, '');

  if (cleanedCPF.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1*$/.test(cleanedCPF)) {
    return false;
  }

  function calculateDigit(base: string, factor: number): number {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base.charAt(i), 10) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  const baseCPF = cleanedCPF.substring(0, 9);
  const firstDigit = calculateDigit(baseCPF, 10);

  const baseCPFWithFirstDigit = baseCPF + firstDigit;
  const secondDigit = calculateDigit(baseCPFWithFirstDigit, 11);

  return cleanedCPF === baseCPF + firstDigit.toString() + secondDigit.toString();
}

export function checkEqualObjs(obj1: Object, obj2: Object) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}
