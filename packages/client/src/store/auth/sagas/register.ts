import { put, takeLatest, select, call } from 'redux-saga/effects';
import {
  ActionType,
  RootState,
  RegisterFormKeys,
} from 'types';
import {
  apiUrl,
  apiOptions,
  ApiMethod,
  logger,
  fieldIsEmpty,
  emailIsValid,
} from 'utils';
import { selectRegisterForm } from '../authSelector';
import { setRegisterFormFieldError } from '../actions/register';
import { userLoginSuccess, getCurrentUserSuccess } from '../actions';
import { User } from '@shared/types';
import { getApartmentList } from 'store/apartment/actions';

function* submitRegister() {
  try {
    logger(`user register`);
    const state: RootState = yield select();
    const form = selectRegisterForm(state);

    // validate
    let hasError = false;
    if (fieldIsEmpty(form[RegisterFormKeys.name])) {
      hasError = true;
      yield put(
        setRegisterFormFieldError({
          key: RegisterFormKeys.name,
          value: 'Name: Required Field'
        })
      );
    }
    if (fieldIsEmpty(form[RegisterFormKeys.email])) {
      hasError = true;
      yield put(
        setRegisterFormFieldError({
          key: RegisterFormKeys.email,
          value: 'Email: Required Field'
        })
      )
    }
    if (fieldIsEmpty(form[RegisterFormKeys.password])) {
      hasError = true;
      yield put(
        setRegisterFormFieldError({
          key: RegisterFormKeys.password,
          value: 'Password: Required Field'
        })
      )
    }
    if (!emailIsValid(form[RegisterFormKeys.email])) {
      hasError = true;
      yield put(
        setRegisterFormFieldError({
          key: RegisterFormKeys.email,
          value: 'Email: Invalid Email'
        })
      )
    }

    // submit
    if (!hasError) {
      const accessToken = yield call(() =>
        fetch(
          `${apiUrl}/register/`,
          apiOptions(ApiMethod.POST, {
            name: form[RegisterFormKeys.name],
            email: form[RegisterFormKeys.email],
            password: form[RegisterFormKeys.password],
            role: form[RegisterFormKeys.role],
          },)
        )
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

export function* authRegisterWatcher() {
  yield takeLatest(ActionType.AUTH_REGISTER_REQUEST as any, submitRegister);
}
