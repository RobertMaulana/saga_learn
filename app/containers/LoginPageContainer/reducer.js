/*
 *
 * LoginPageContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
  status: 'empty',
});

function loginPageContainerReducer(state = initialState, action = null) {
  switch (action.type) {
    // login
    case LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('status', 'loading')
        .set('data', false)
        .set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('status', 'success')
        .set('data', fromJS(action.data))
        .set('error', false);
    case LOGIN_FAILURE:
      return state
        .set('loading', false)
        .set('status', 'error')
        .set('data', fromJS(action.data))
        .set('error', true);
    default:
      return state;
  }
}

export default loginPageContainerReducer;
