export type UserCredentials = {
  username: string;
  password: string;
};

export type RecoverPassword = {
  username: string;
};

export type RecoverCode = {
  code: string;
};

export type ChangePassword = {
  password: string;
  passwordConfirm: string;
};

export type UserDetails = {
  id: number;
  cnpj: string;
  email: string;
  image: string;
  token: string;
  gender: string;
  lastName: string;
  firstName: string;
  companyName: string;
  role: string | string[];
};
