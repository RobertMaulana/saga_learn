/*
 *
 * AppHomePage actions
 *
 */

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST_TMI,
  FETCH_DATA_SUCCESS_TMI,
  FETCH_DATA_FAILURE_TMI,
  FETCH_DATA_REQUEST_INVOICE,
  FETCH_DATA_SUCCESS_INVOICE,
  FETCH_DATA_FAILURE_INVOICE,
  FETCH_DATA_REQUEST_ATTACHMENT,
  FETCH_DATA_SUCCESS_ATTACHMENT,
  FETCH_DATA_FAILURE_ATTACHMENT,
  FETCH_DATA_REQUEST_JUNK,
  FETCH_DATA_SUCCESS_JUNK,
  FETCH_DATA_FAILURE_JUNK,
  FETCH_DATA_REQUEST_ALLJUNK,
  FETCH_DATA_SUCCESS_ALLJUNK,
  FETCH_DATA_FAILURE_ALLJUNK,
} from './constants';

// get data CSV
export function fetchDataRequest() {
  return {
    type: FETCH_DATA_REQUEST,
  };
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data,
  };
}

export function fetchDataFailure(data) {
  return {
    type: FETCH_DATA_FAILURE,
    data,
  };
}

// get data TMI monthly
export function fetchDataRequestTMI() {
  return {
    type: FETCH_DATA_REQUEST_TMI,
  };
}

export function fetchDataSuccessTMI(data) {
  return {
    type: FETCH_DATA_SUCCESS_TMI,
    data,
  };
}

export function fetchDataFailureTMI(data) {
  return {
    type: FETCH_DATA_FAILURE_TMI,
    data,
  };
}

// get data Invoice
export function fetchDataRequestInvoice() {
  return {
    type: FETCH_DATA_REQUEST_INVOICE,
  };
}

export function fetchDataSuccessInvoice(data) {
  return {
    type: FETCH_DATA_SUCCESS_INVOICE,
    data,
  };
}

export function fetchDataFailureInvoice(data) {
  return {
    type: FETCH_DATA_FAILURE_INVOICE,
    data,
  };
}

// get data Attachment
export function fetchDataRequestAttachment() {
  return {
    type: FETCH_DATA_REQUEST_ATTACHMENT,
  };
}

export function fetchDataSuccessAttachment(data) {
  return {
    type: FETCH_DATA_SUCCESS_ATTACHMENT,
    data,
  };
}

export function fetchDataFailureAttachment(data) {
  return {
    type: FETCH_DATA_FAILURE_ATTACHMENT,
    data,
  };
}

// get data Custom Junk
export function fetchDataRequestJunk() {
  return {
    type: FETCH_DATA_REQUEST_JUNK,
  };
}

export function fetchDataSuccessJunk(data) {
  return {
    type: FETCH_DATA_SUCCESS_JUNK,
    data,
  };
}

export function fetchDataFailureJunk(data) {
  return {
    type: FETCH_DATA_FAILURE_JUNK,
    data,
  };
}

// get data All Junk
export function fetchDataRequestAllJunk() {
  return {
    type: FETCH_DATA_REQUEST_ALLJUNK,
  };
}

export function fetchDataSuccessAllJunk(data) {
  return {
    type: FETCH_DATA_SUCCESS_ALLJUNK,
    data,
  };
}

export function fetchDataFailureAllJunk(data) {
  return {
    type: FETCH_DATA_FAILURE_ALLJUNK,
    data,
  };
}
