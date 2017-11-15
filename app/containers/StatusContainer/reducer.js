/*
 *
 * StatusContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,
  AUTHORIZE_DATA_REQUEST,
  AUTHORIZE_DATA_SUCCESS,
  AUTHORIZE_DATA_FAILURE,
} from './constants';

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
  status: 'empty',
  dataDelete: false,
  loadingDelete: false,
  errorDelete: false,
  statusDelete: 'empty',
  dataAuthorize: false,
  loadingAuthorize: false,
  errorAuthorize: false,
  statusAuthorize: 'empty',
});

function statusContainerReducer(state = initialState, action = null) {
  switch (action.type) {
    // get data
    case FETCH_DATA_REQUEST:
      return state
        .set('loading', true)
        .set('status', 'loading')
        .set('data', false)
        .set('error', false);
    case FETCH_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('status', 'success')
        .set('data', fromJS(action.data))
        .set('error', false);
    case FETCH_DATA_FAILURE:
      return state
        .set('loading', false)
        .set('status', 'error')
        .set('data', fromJS(action.data))
        .set('error', true);
    // delete
    case DELETE_DATA_REQUEST:
      return state
        .set('loadingDelete', true)
        .set('statusDelete', 'loading')
        .set('dataDelete', false)
        .set('errorDelete', false);
    case DELETE_DATA_SUCCESS:
      return state
        .set('loadingDelete', false)
        .set('statusDelete', 'success')
        .set('dataDelete', fromJS(action.data))
        .set('errorDelete', false);
    case DELETE_DATA_FAILURE:
      return state
        .set('loadingDelete', false)
        .set('statusDelete', 'error')
        .set('dataDelete', fromJS(action.data))
        .set('errorDelete', true);
    // authorize
    case AUTHORIZE_DATA_REQUEST:
      return state
        .set('loadingAuthorize', true)
        .set('statusAuthorize', 'loading')
        .set('dataAuthorize', false)
        .set('errorAuthorize', false);
    case AUTHORIZE_DATA_SUCCESS:
      return state
        .set('loadingAuthorize', false)
        .set('statusAuthorize', 'success')
        .set('dataAuthorize', fromJS(action.data))
        .set('errorAuthorize', false);
    case AUTHORIZE_DATA_FAILURE:
      return state
        .set('loadingAuthorize', false)
        .set('statusAuthorize', 'error')
        .set('dataAuthorize', fromJS(action.data))
        .set('errorAuthorize', true);
    default:
      return state;
  }
}

export default statusContainerReducer;
