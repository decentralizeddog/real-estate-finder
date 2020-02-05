import { all, put } from "redux-saga/effects";
import { ActionType } from 'types';
import basic from 'store/app/basicSaga';
import auth from 'store/auth/authSaga';
import apartment from 'store/apartment/apartmentSaga';
import users from 'store/users/usersSaga';

export default function* rootSaga() {
    yield all([
        ...basic,
        ...auth,
        ...apartment,
        ...users,
    ]);
    yield put({
        type: ActionType.INIT_STORE
    });
}
