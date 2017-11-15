import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  FETCH_GRAPH_REQUEST,
  FETCH_GRAPHSIMPLE_REQUEST,
  FETCH_GRAPHCOMPLETE_REQUEST,
} from './constants';
import {
  fetchGraphSuccess,
  fetchGraphFailure,
  fetchGraphSimpleSuccess,
  fetchGraphSimpleFailure,
  fetchGraphCompleteSuccess,
  fetchGraphCompleteFailure,
} from './actions';

import request from 'utils/request';

function* fetchGraph() {
  // const url = 'https://report-api.pasarpolis.com/api/goridetrx/getgraph';
  const url = 'http://localhost:50010/api/goridetrx/getgraph';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(fetchGraphSuccess(JSON.stringify(results.data)));
  } else {
    yield put(fetchGraphFailure(JSON.stringify(results.err)));
  }
}

function* fetchGraphSimple() {
  const url = 'http://localhost:50010/api/gocarsimpletrx/getgraph';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(fetchGraphSimpleSuccess(JSON.stringify(results.data)));
  } else {
    yield put(fetchGraphSimpleFailure(JSON.stringify(results.err)));
  }
}

function* fetchGraphComplete() {
  const url = 'http://localhost:50010/api/gocarcompletetrx/getgraph';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(fetchGraphCompleteSuccess(JSON.stringify(results.data)));
  } else {
    yield put(fetchGraphCompleteFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, FETCH_GRAPH_REQUEST, fetchGraph);
  yield fork(takeLatest, FETCH_GRAPHSIMPLE_REQUEST, fetchGraphSimple);
  yield fork(takeLatest, FETCH_GRAPHCOMPLETE_REQUEST, fetchGraphComplete);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
