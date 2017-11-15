/*
 *
 * RecordContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
  VIEW_DATA_FAILURE,
} from './constants';

const initialState = fromJS({
  dataView: false,
  loadingView: false,
  errorView: false,
  statusView: 'empty',
});

function recordContainerReducer(state = initialState, action = null) {
  switch (action.type) {
    // view
    case VIEW_DATA_REQUEST:
      return state
        .set('loadingView', true)
        .set('statusView', 'loading')
        .set('dataView', false)
        .set('errorView', false);
    case VIEW_DATA_SUCCESS:
      return state
        .set('loadingView', false)
        .set('statusView', 'success')
        .set('dataView', fromJS(action.data))
        .set('errorView', false);
    case VIEW_DATA_FAILURE:
      return state
        .set('loadingView', false)
        .set('statusView', 'error')
        .set('dataView', fromJS(action.data))
        .set('errorView', true);
    default:
      return state;
  }
}

export default recordContainerReducer;
