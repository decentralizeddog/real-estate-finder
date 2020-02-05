import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ActionType,
} from 'types';
import { User, UserRole } from '@shared/types';
import {
  apiUrl,
  apiOptions,
  ApiMethod,
  logger,
} from 'utils';
import { setLoading } from 'store/app/actions';
import { userLoginSuccess, getCurrentUserSuccess } from '../actions';
import { getApartmentList } from 'store/apartment/actions';
import { getUsersList } from 'store/users/actions';

function* reload() {
  logger(`auth reload`);
  yield put(setLoading(true));
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      
      const user: User = yield call(() =>
        fetch(`${apiUrl}/auth/`, apiOptions(ApiMethod.GET, undefined, accessToken))
        .then(res => res.json())
        .then(res => res)
      );
      yield put(userLoginSuccess(accessToken));
      yield put(getCurrentUserSuccess(user));
      yield put(getApartmentList());
      if (user.role === UserRole.Admin) {
        yield put(getUsersList());
      }
    }
  } catch (error) {
    yield put(setLoading(false));
  }
  yield put(setLoading(false));
}

export function* reloadWatcher() {
  yield takeLatest(ActionType.INIT_STORE as any, reload);
}