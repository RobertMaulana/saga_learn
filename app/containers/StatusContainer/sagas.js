/* @flow */

import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  FETCH_DATA_REQUEST,
  DELETE_DATA_REQUEST,
  AUTHORIZE_DATA_REQUEST,
} from './constants';
import {
  fetchDataSuccess,
  fetchDataFailure,
  deleteDataSuccess,
  deleteDataFailure,
  authorizeDataSuccess,
  authorizeDataFailure,
} from './actions';

import request from 'utils/request';
const baseUrl = 'http://localhost:50010/api'

function* fetchData() {
  const url = `${baseUrl}/status`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(fetchDataSuccess(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailure(JSON.stringify(results.err)));
  }
}

function* deleteData() {
  const url = `${baseUrl}/status`;
  const start = localStorage.getItem('start_date_invoice');
  const end = localStorage.getItem('end_date_invoice');
  const params = {
    startDate: start,
    endDate: end,
  };
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
    yield put(deleteDataSuccess(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailure(JSON.stringify(results.err)));
  }
}

function* authorizeData() {
  const url = `${baseUrl}/v2/authorize`;
  const filename = localStorage.getItem('filename');
  const params = {
    fileName: filename,
  };
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
    yield put(authorizeDataSuccess(JSON.stringify(results.data)));
  } else {
    yield put(authorizeDataFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, FETCH_DATA_REQUEST, fetchData);
  yield fork(takeLatest, DELETE_DATA_REQUEST, deleteData);
  yield fork(takeLatest, AUTHORIZE_DATA_REQUEST, authorizeData);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
