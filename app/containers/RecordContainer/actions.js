/*
 *
 * RecordContainer actions
 *
 */

import {
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
  VIEW_DATA_FAILURE,
} from './constants';

// view data
export function viewDataRequest() {
  return {
    type: VIEW_DATA_REQUEST,
  };
}

export function viewDataSuccess(data) {
  return {
    type: VIEW_DATA_SUCCESS,
    data,
  };
}

export function viewDataFailure(data) {
  return {
    type: VIEW_DATA_FAILURE,
    data,
  };
}
