import {
  ActionType,
  RegisterFormFieldPayload,
} from 'types';

export const userRegister = () => {
  console.log('user register request');
  return {
    type: ActionType.AUTH_REGISTER_REQUEST,
  }
}

export const userRegisterSuccess = () => {
  return {
    type: ActionType.AUTH_REGISTER_SUCCESS,
  }
}

export const setRegisterFormField = (payload: RegisterFormFieldPayload) => {
  return {
    type: ActionType.AUTH_REGISTER_SET_FORM,
    payload,
  }
}

export const setRegisterFormFieldError = (payload: RegisterFormFieldPayload) => {
  return {
    type: ActionType.AUTH_REGISTER_SET_FORM_ERROR,
    payload,
  }
}

