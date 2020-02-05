import { fork } from 'redux-saga/effects';
import { usersWatcher } from './sagas';

export default [
  fork(usersWatcher),
];
