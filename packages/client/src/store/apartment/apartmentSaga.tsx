import { fork } from 'redux-saga/effects';
import { apartmentWatcher } from './sagas';

export default [
  fork(apartmentWatcher),
];
