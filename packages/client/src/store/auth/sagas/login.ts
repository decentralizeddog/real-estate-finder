import { put, takeLatest, select, call } from 'redux-saga/effects';
import {
  ActionType,
  RootState,
  LoginFormKeys,
} from 'types';
import {
  apiUrl,
  apiOptions,
  ApiMethod,
  logger,
  fieldIsEmpty,
  emailIsValid,
} from 'utils';
import {
  setLoginFormFieldError,
  userLoginSuccess,
  getCurrentUserSuccess,
} from '../actions';
import {
  selectLoginForm,
} from '../authSelector';
import { User } from '@shared/types';
import { getApartmentList } from 'store/apartment/actions';

function* userLogin() {
  try {
    logger(`user login`);
    const state: RootState = yield select();
    const form = selectLoginForm(state);

    // validate
    let hasError = false;
    if (fieldIsEmpty(form[LoginFormKeys.email])) {
      hasError = true;
      yield put(
        setLoginFormFieldError({
          key: LoginFormKeys.email,
          value: 'Email: Required Field',
        }),
      );
    }
    if (fieldIsEmpty(form[LoginFormKeys.password])) {
      hasError = true;
      yield put(
        setLoginFormFieldError({
          key: LoginFormKeys.password,
          value: 'Password: Required Field',
        }),
      );
    }
    if (!emailIsValid(form[LoginFormKeys.email])) {
      hasError = true;
      yield put(
        setLoginFormFieldError({
          key: LoginFormKeys.email,
          value: 'Email: Invalid Email',
        }),
      )
    }

    // login
    if (!hasError) {
      const accessToken = yield call(() => 
        fetch(`${apiUrl}/auth/`, apiOptions(ApiMethod.POST, {
          email: form[LoginFormKeys.email],
          password: form[LoginFormKeys.password],
        }))
        .then(res => res.json())
        .then(res => res.token)
      );

      const user: User = yield call(() =>
        fetch(`${apiUrl}/auth/`, apiOptions(ApiMethod.GET, undefined, accessToken))
        .then(res => res.json())
        .then(res => res)
      );

      yield put(userLoginSuccess(accessToken));
      yield put(getCurrentUserSuccess(user));
      yield put(getApartmentList());
    }
  } catch (error) {
    
  }
}

export function* authLoginWatcher() {
  yield takeLatest(ActionType.AUTH_LOGIN_REQUEST as any, userLogin);
}
