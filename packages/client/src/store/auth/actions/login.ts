import { ActionType, LoginFormFieldPayload } from 'types';
import { User } from '@shared/types';

export const userLogin = () => {
  return {
    type: ActionType.AUTH_LOGIN_REQUEST,
  }
}

export const userLoginSuccess = (payload: string) => {
  return {
    type: ActionType.AUTH_LOGIN_SUCCESS,
    payload,
  }
}

export const setLoginFormField = (payload: LoginFormFieldPayload) => {
  return {
    type: ActionType.AUTH_LOGIN_SET_FORM,
    payload,
  }
}

export const setLoginFormFieldError = (payload: LoginFormFieldPayload) => {
  return {
    type: ActionType.AUTH_LOGIN_SET_FORM_ERROR,
    payload,
  }
}

export const getCurrentUserSuccess = (payload: User) => {
  return {
    type: ActionType.AUTH_GET_CURRENT_USER_SUCCESS,
    payload,
  }
}
