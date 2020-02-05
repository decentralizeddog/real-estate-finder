import { put, takeLatest, select, call, delay } from 'redux-saga/effects';
import {
  ActionType,
  RootState,
  Action,
  UsersFormKeys,
} from 'types';
import {
  apiUrl,
  apiOptions,
  ApiMethod,
  logger,
  fieldIsEmpty,
  emailIsValid,
} from 'utils';

import { selectAuthorization } from 'store/auth/authSelector';
import {
  getUsersListSuccess,
  getUsersListFailure,
  submitUsersFormFailure,
  clearUsersFormField,
  submitUsersFormSuccess,
  updateUserFailure,
  removeUserSuccess,
  removeUserFailure,
  updateUserSuccess,
  setUserAddDialogOpenStatus,
  setUsersFormFieldError,
  setUserEditDialogOpenStatus,
} from '../actions';
import {
  selectUsersFormField,
} from '../usersSelector';


function* getUsersList() {
  try {
    delay(500);
    logger(`get users list`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    if (!authorization) return;

    const items = yield call(() =>
      fetch(`${apiUrl}/user/list`, apiOptions(ApiMethod.GET, undefined, authorization))
      .then(res => res.json())
      .then(res => res)
    );
    yield put(getUsersListSuccess(items));
  } catch (error) {
    yield put(getUsersListFailure(error));
  }
}

function* validateUsersForm() {
  const form = selectUsersFormField(yield select());
  let hasError = false;

  if (fieldIsEmpty(form[UsersFormKeys.name])) {
    hasError = true;
    yield put(
      setUsersFormFieldError({
        key: UsersFormKeys.name,
        value: 'Name: Required Field'
      })
    );
  }
  if (fieldIsEmpty(form[UsersFormKeys.email])) {
    hasError = true;
    yield put(
      setUsersFormFieldError({
        key: UsersFormKeys.email,
        value: 'Email: Required Field'
      })
    )
  }
  if (!form[UsersFormKeys.password] || fieldIsEmpty(form[UsersFormKeys.password]!)) {
    hasError = true;
    yield put(
      setUsersFormFieldError({
        key: UsersFormKeys.password,
        value: 'Password: Required Field'
      })
    )
  }
  if (!emailIsValid(form[UsersFormKeys.email])) {
    hasError = true;
    yield put(
      setUsersFormFieldError({
        key: UsersFormKeys.email,
        value: 'Email: Invalid Email'
      })
    )
  }
  return hasError;
}

function* submitUsersForm() {
  try {
    logger(`submit user form`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    const form = selectUsersFormField(state);
    if (!authorization) return;

    // validate
    const hasError = yield call(validateUsersForm);

    // submit
    if (!hasError) {
      
      const newUser = yield call(() =>
        fetch(`${apiUrl}/user/create`, apiOptions(ApiMethod.POST, {
          name: form[UsersFormKeys.name],
          email: form[UsersFormKeys.email] ,
          password: form[UsersFormKeys.password]!,
          role: form[UsersFormKeys.role],
        }, authorization))
        .then(res => res.json())
        .then(res => res)
      );

      yield put(submitUsersFormSuccess(newUser));
      yield put(clearUsersFormField());
      yield put(setUserAddDialogOpenStatus(false));
    }
  } catch (error) {
    yield put(submitUsersFormFailure(error));
  }
}

function* updateUserForm() {
  try {
    logger(`update user form`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    const form = selectUsersFormField(state);
    if (!authorization) return;

    let hasError = false;

    if (fieldIsEmpty(form[UsersFormKeys.name])) {
      hasError = true;
      yield put(
        setUsersFormFieldError({
          key: UsersFormKeys.name,
          value: 'Name: Required Field'
        })
      );
    }
    if (fieldIsEmpty(form[UsersFormKeys.email])) {
      hasError = true;
      yield put(
        setUsersFormFieldError({
          key: UsersFormKeys.email,
          value: 'Email: Required Field'
        })
      )
    }
    if (!emailIsValid(form[UsersFormKeys.email])) {
      hasError = true;
      yield put(
        setUsersFormFieldError({
          key: UsersFormKeys.email,
          value: 'Email: Invalid Email'
        })
      )
    }

    if (!hasError) {
      const updated = yield call(() =>
        fetch(`${apiUrl}/user/update`, apiOptions(ApiMethod.POST, form, authorization))
        .then(res => res.json())
        .then(res => res)
      );

      yield put(updateUserSuccess(updated));
      yield put(clearUsersFormField());
      yield put(setUserEditDialogOpenStatus(false));
    }
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* removeUser({ payload }: Action<string>) {
  try {
    logger(`remove user`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    if (!authorization) return;

    yield call(() =>
      fetch(`${apiUrl}/user/remove`, apiOptions(ApiMethod.POST, { id: payload }, authorization))
      .then(res => res.json())
      .then(res => res)
    );

    yield put(removeUserSuccess(payload));
  } catch (error) {
    yield put(removeUserFailure(error));
  }
}

export function* usersWatcher() {
  yield takeLatest(ActionType.USERS_GET_LIST_REQUEST as any, getUsersList);
  yield takeLatest(ActionType.USERS_SUBMIT_FORM_REQUEST as any, submitUsersForm);
  yield takeLatest(ActionType.USERS_UPDATE_REQUEST as any, updateUserForm);
  yield takeLatest(ActionType.USERS_REMOVE_REQUEST as any, removeUser);
}
