import { RootState } from 'types';
import { AuthReducerType } from './authReducer';
import { createSelector } from 'reselect';

export const selectAuthState = (state: RootState, props?: any): AuthReducerType => {
  return state.auth;
};

export const selectIsLoggedin = createSelector(
  [ selectAuthState ],
  (authState) => authState.logged,
);

export const selectLoginForm = createSelector(
  [ selectAuthState ],
  (authState) => authState.loginForm,
);

export const selectLoginFormError = createSelector(
  [ selectAuthState ],
  (authState) => authState.loginFormError,
);

export const selectAuthorization = createSelector(
  [ selectAuthState ],
  (authState) => authState.accessToken,
);

export const selectRegisterForm = createSelector(
  [ selectAuthState ],
  (authState) => authState.registerForm,
);

export const selectRegisterFormError = createSelector(
  [ selectAuthState ],
  (authState) => authState.registerFormError,
);

export const selectCurrentUser = createSelector(
  [ selectAuthState ],
  (authState) => authState.currentUser
);
