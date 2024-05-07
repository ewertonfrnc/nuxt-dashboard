import { authMock } from "./auth.mock";
import { homeMock } from "./home.mock";
import { timeSheet } from "./time-sheet.mock";

const mockTypes = {
  auth: authMock,
  home: homeMock,
  timeSheet,
};

export const getResponse = (
  request: string,
  mockType: keyof typeof mockTypes,
) => {
  return new Promise((resolve, reject) => {
    const mock = mockTypes[mockType][request];

    if (!mock) {
      reject(new Error("Falha na operação. Tente novamente mais tarde!"));
    }

    resolve(mock);
  });
};
