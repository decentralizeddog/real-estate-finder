import { Action, RegisterFormFieldPayload, } from 'types';
import { AuthReducerType } from '../authReducer';


export const registerSetFormFieldReducer = (
  state: AuthReducerType,
  { payload }: Action<RegisterFormFieldPayload>,
): AuthReducerType => {
  return {
    ...state,
    registerForm: {
      ...state.registerForm,
      [payload.key]: payload.value,
    }
  }
}

export const registerSetFormFieldErrorReducer = (
  state: AuthReducerType,
  { payload }: Action<RegisterFormFieldPayload>,
): AuthReducerType => {
  return {
    ...state,
    registerFormError: {
      ...state.registerFormError,
      [payload.key]: payload.value,
    }
  }
}
