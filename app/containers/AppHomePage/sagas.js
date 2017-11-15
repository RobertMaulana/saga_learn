import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_REQUEST_TMI,
  FETCH_DATA_REQUEST_INVOICE,
  FETCH_DATA_REQUEST_ATTACHMENT,
  FETCH_DATA_REQUEST_JUNK,
  FETCH_DATA_REQUEST_ALLJUNK,
} from './constants';
import {
  fetchDataSuccess,
  fetchDataFailure,
  fetchDataSuccessTMI,
  fetchDataFailureTMI,
  fetchDataSuccessInvoice,
  fetchDataFailureInvoice,
  fetchDataSuccessAttachment,
  fetchDataFailureAttachment,
  fetchDataSuccessJunk,
  fetchDataFailureJunk,
  fetchDataSuccessAllJunk,
  fetchDataFailureAllJunk,
} from './actions';

import request from 'utils/request';
import APIBase from '../../../internals/api-base';

const baseUrl = `${APIBase}/api/`;
let urlBilling;
let urlTMI;
let urlInvoice;
let urlAttachment;
let urlJunk;
let urlAllJunk;

switch (localStorage.getItem('category')) {
  case 'goride':
    urlBilling = `${baseUrl}goridetrx/report/billing`;
    urlTMI = `${baseUrl}goridetrx/report/tmi`;
    urlInvoice = `${baseUrl}goridetrx/report/invoice`;
    urlAttachment = `${baseUrl}goridetrx/report/invoiceattachment`;
    urlJunk = `${baseUrl}goridetrxduplicate/`;
    urlAllJunk = `${baseUrl}goridetrxduplicate`;
    break;
  case 'simpel':
    urlBilling = `${baseUrl}gocarsimpletrx/report/billing`;
    urlTMI = `${baseUrl}gocarsimpletrx/report/tmi`;
    urlInvoice = `${baseUrl}gocarsimpletrx/report/invoice`;
    urlAttachment = `${baseUrl}gocarsimpletrx/report/invoiceattachment`;
    urlJunk = `${baseUrl}gocarsimpletrxduplicate/`;
    urlAllJunk = `${baseUrl}gocarsimpletrxduplicate/`;
    break;
  case 'komplit':
    urlBilling = `${baseUrl}gocarcompletetrx/report/billing`;
    urlTMI = `${baseUrl}gocarcompletetrx/report/tmi`;
    urlInvoice = `${baseUrl}gocarcompletetrx/report/invoice`;
    urlAttachment = `${baseUrl}gocarcompletetrx/report/invoiceattachment`;
    urlJunk = `${baseUrl}gocarcompletetrxduplicate/`;
    urlAllJunk = `${baseUrl}gocarcompletetrxduplicate/`;
    break;
  default:
    urlBilling = `${baseUrl}goridetrx/report/billing`;
    urlTMI = `${baseUrl}goridetrx/report/tmi`;
    urlInvoice = `${baseUrl}goridetrx/report/invoice`;
    urlAttachment = `${baseUrl}goridetrx/report/invoiceattachment`;
    urlJunk = `${baseUrl}goridetrxduplicate/`;
    urlAllJunk = `${baseUrl}goridetrxduplicate/`;
    break;
}

console.log(`urlBill ${urlBilling}`);
console.log(`category ${localStorage.getItem('category')}`);

function* fetchData() {
  const url = urlBilling;
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

function* fetchDataTMI() {
  const url = urlTMI;
  const month = localStorage.getItem('month');
  const year = localStorage.getItem('year');
  const monthYear = `${year}-${month}`;
  const params = {
    date: monthYear,
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
    yield put(fetchDataSuccessTMI(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailureTMI(JSON.stringify(results.err)));
  }
}

function* fetchDataInvoice() {
  const url = urlInvoice;
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
    yield put(fetchDataSuccessInvoice(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailureInvoice(JSON.stringify(results.err)));
  }
}

function* fetchDataAttachment() {
  const url = urlAttachment;
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
    yield put(fetchDataSuccessAttachment(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailureAttachment(JSON.stringify(results.err)));
  }
}

function* fetchDataJunk() {
  const url = urlJunk;
  const start = localStorage.getItem('start_date_junk');
  const end = localStorage.getItem('end_date_junk');
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
    yield put(fetchDataSuccessJunk(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailureJunk(JSON.stringify(results.err)));
  }
}

function* fetchDataAllJunk() {
  const url = urlAllJunk;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const results = yield call(request, url, options);

  if (!results.err) {
    yield put(fetchDataSuccessAllJunk(JSON.stringify(results.data)));
  } else {
    yield put(fetchDataFailureAllJunk(JSON.stringify(results.err)));
  }
}

function* defaultSaga() {
  yield fork(takeLatest, FETCH_DATA_REQUEST, fetchData);
  yield fork(takeLatest, FETCH_DATA_REQUEST_TMI, fetchDataTMI);
  yield fork(takeLatest, FETCH_DATA_REQUEST_INVOICE, fetchDataInvoice);
  yield fork(takeLatest, FETCH_DATA_REQUEST_ATTACHMENT, fetchDataAttachment);
  yield fork(takeLatest, FETCH_DATA_REQUEST_JUNK, fetchDataJunk);
  yield fork(takeLatest, FETCH_DATA_REQUEST_ALLJUNK, fetchDataAllJunk);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
