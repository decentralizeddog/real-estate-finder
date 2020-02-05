import { FormFieldPayload } from './actionTypes';

export enum LoginFormKeys {
  email = 'email',
  password = 'password',
}

export interface LoginUserForm {
  [LoginFormKeys.email]: string;
  [LoginFormKeys.password]: string;
}

export const defaultLoginForm: LoginUserForm = {
  [LoginFormKeys.email]: '',
  [LoginFormKeys.password]: '',
}

export type LoginFormFieldPayload = FormFieldPayload<LoginFormKeys>;
