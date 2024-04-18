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
