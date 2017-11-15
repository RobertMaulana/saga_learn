import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
} from './constants';
import {
  loginSuccess,
  loginFailure,
} from './actions';

import request from 'utils/request';

function* login() {
  const url = 'https://report-api.pasarpolis.com/api/user/';
  const user = localStorage.getItem('username');
  const pass = localStorage.getItem('password');
  const params = {
    username: user,
    password: pass,
  };
  console.log(params);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(loginSuccess(JSON.stringify(results.data)));
  } else {
    yield put(loginFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, LOGIN_REQUEST, login);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
