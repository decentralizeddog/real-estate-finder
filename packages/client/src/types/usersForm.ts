import { FormFieldPayload } from './actionTypes';
import { UserRole } from '@shared/types';

export enum UsersFormKeys {
  id = 'id',
  name = 'name',
  email = 'email',
  password = 'password',
  role = 'role',
}

export interface UsersForm {
  [UsersFormKeys.id]?: string;
  [UsersFormKeys.name]: string;
  [UsersFormKeys.email]: string;
  [UsersFormKeys.password]?: string;
  [UsersFormKeys.role]: UserRole;
}

export const defaultUsersForm: UsersForm = {
  [UsersFormKeys.id]: undefined,
  [UsersFormKeys.name]: '',
  [UsersFormKeys.email]: '',
  [UsersFormKeys.password]: undefined,
  [UsersFormKeys.role]: UserRole.Client,
}

export type UsersFormFieldPayload = FormFieldPayload<UsersFormKeys>;
