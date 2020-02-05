import { FormFieldPayload } from './actionTypes';
import {
  UserRole,
} from '@shared/types';

export enum RegisterFormKeys {
  name = 'name',
  email = 'email',
  password = 'password',
  role = 'role',
}

export interface RegisterForm {
  [RegisterFormKeys.name]: string;
  [RegisterFormKeys.email]: string;
  [RegisterFormKeys.password]: string;
  [RegisterFormKeys.role]: UserRole;
}

export const defaultRegisterForm: RegisterForm = {
  [RegisterFormKeys.name]: '',
  [RegisterFormKeys.email]: '',
  [RegisterFormKeys.password]: '',
  [RegisterFormKeys.role]: UserRole.Client,
}

export type RegisterFormFieldPayload = FormFieldPayload<RegisterFormKeys>;
