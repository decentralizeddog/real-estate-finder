import { fork } from 'redux-saga/effects';
import { authLoginWatcher, authRegisterWatcher, reloadWatcher } from './sagas';

export default [
  fork(authLoginWatcher),
  fork(authRegisterWatcher),
  fork(reloadWatcher),
];
