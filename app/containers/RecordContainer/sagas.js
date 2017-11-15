import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  VIEW_DATA_REQUEST,
} from './constants';
import {
  viewDataSuccess,
  viewDataFailure,
} from './actions';

import request from 'utils/request';

const baseUrl = 'http://localhost:50010/api/';

function* viewData() {
  let productType;
  if (localStorage.getItem('model') == 'goRideTrxMaster') {
    productType = 'goridetrx';
  } else if (localStorage.getItem('model') == 'goCarSimpleTrxMaster') {
    productType = 'gocarsimpletrx';
  } else if (localStorage.getItem('model') == 'goCarCompleteTrxMaster') {
    productType = 'gocarcompletetrx';
  }

  const url = `${baseUrl}${productType}/temp`;
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

  console.log({ request, url, results })

  if (!results.err) {
    yield put(viewDataSuccess(JSON.stringify(results.data)));
  } else {
    yield put(viewDataFailure(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, VIEW_DATA_REQUEST, viewData);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
