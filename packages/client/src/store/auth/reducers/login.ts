import { Action, LoginFormFieldPayload } from 'types';
import { AuthReducerType } from '../authReducer';
import { User } from '@shared/types';

export const userLoginSuccessReducer = (
  state: AuthReducerType,
  { payload }: Action<string>,
): AuthReducerType => {
  localStorage.setItem('accessToken', payload);
  return {
    ...state,
    logged: true,
    accessToken: payload,
  };
}

export const loginSetFormFieldReducer = (
  state: AuthReducerType,
  { payload }: Action<LoginFormFieldPayload>,
): AuthReducerType => {
  return {
    ...state,
    loginForm: {
      ...state.loginForm,
      [payload.key]: payload.value,
    }
  }
}

export const loginSetFormFieldErrorReducer = (
  state: AuthReducerType,
  { payload }: Action<LoginFormFieldPayload>,
): AuthReducerType => {
  return {
    ...state,
    loginFormError: {
      ...state.loginFormError,
      [payload.key]: payload.value,
    }
  }
}

export const getCurrentUserSuccessReducer = (
  state: AuthReducerType,
  { payload }: Action<User>,
): AuthReducerType => {
  return {
    ...state,
    currentUser: payload,
  }
}
