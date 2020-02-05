import { AuthReducerType } from '../authReducer';

export const userLogoutReducer = (
  state: AuthReducerType,
): AuthReducerType => {
  localStorage.removeItem('accessToken');
  return {
    ...state,
    logged: false,
    accessToken: undefined,
    currentUser: undefined,
  };
}