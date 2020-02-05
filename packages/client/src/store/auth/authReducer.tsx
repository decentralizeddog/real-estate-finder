import {
  ActionType,
  LoginUserForm,
  defaultLoginForm,
  FieldErrors,
  RegisterForm,
  defaultRegisterForm,
} from 'types';
import createReducer from 'store/config/createReducer';
import {
    userLoginSuccessReducer, loginSetFormFieldReducer, loginSetFormFieldErrorReducer, getCurrentUserSuccessReducer,
} from './reducers';
import { registerSetFormFieldReducer, registerSetFormFieldErrorReducer } from './reducers/register';
import { User } from '@shared/types';
import { userLogoutReducer } from './reducers/logout';

export interface AuthReducerType {
  logged: boolean;
  error?: any;
  accessToken?: string;
  currentUser?: User;

  loginForm: LoginUserForm;
  loginFormError: FieldErrors;
  
  registerForm: RegisterForm;
  registerFormError: FieldErrors;  
}

export const defaultState: AuthReducerType = {
  logged: false,
  accessToken: undefined,
  error: '',
  loginForm: defaultLoginForm,
  loginFormError: {},
  registerForm: defaultRegisterForm,
  registerFormError: {},
};

export const authReducer = createReducer<AuthReducerType>(defaultState, {
  [ActionType.AUTH_LOGIN_SUCCESS]: userLoginSuccessReducer,
  [ActionType.AUTH_LOGIN_SET_FORM]: loginSetFormFieldReducer,
  [ActionType.AUTH_LOGIN_SET_FORM_ERROR]: loginSetFormFieldErrorReducer,
  [ActionType.AUTH_GET_CURRENT_USER_SUCCESS]: getCurrentUserSuccessReducer,

  [ActionType.AUTH_REGISTER_SET_FORM]: registerSetFormFieldReducer,
  [ActionType.AUTH_REGISTER_SET_FORM_ERROR]: registerSetFormFieldErrorReducer,

  [ActionType.AUTH_LOGOUT]: userLogoutReducer,
});
