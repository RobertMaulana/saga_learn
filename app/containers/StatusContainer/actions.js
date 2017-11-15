/*
 *
 * StatusContainer actions
 *
 */

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
  VIEW_DATA_FAILURE,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,
  AUTHORIZE_DATA_REQUEST,
  AUTHORIZE_DATA_SUCCESS,
  AUTHORIZE_DATA_FAILURE,
} from './constants';

// get data
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
// delete data
export function deleteDataRequest() {
  return {
    type: DELETE_DATA_REQUEST,
  };
}

export function deleteDataSuccess(data) {
  return {
    type: DELETE_DATA_SUCCESS,
    data,
  };
}

export function deleteDataFailure(data) {
  return {
    type: DELETE_DATA_FAILURE,
    data,
  };
}
// authorize data
export function authorizeDataRequest() {
  return {
    type: AUTHORIZE_DATA_REQUEST,
  };
}

export function authorizeDataSuccess(data) {
  return {
    type: AUTHORIZE_DATA_SUCCESS,
    data,
  };
}

export function authorizeDataFailure(data) {
  return {
    type: AUTHORIZE_DATA_FAILURE,
    data,
  };
}