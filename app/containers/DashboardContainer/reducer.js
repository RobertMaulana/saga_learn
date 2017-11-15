/*
 *
 * DashboardContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_GRAPH_REQUEST,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
  FETCH_GRAPHSIMPLE_REQUEST,
  FETCH_GRAPHSIMPLE_SUCCESS,
  FETCH_GRAPHSIMPLE_FAILURE,
  FETCH_GRAPHCOMPLETE_REQUEST,
  FETCH_GRAPHCOMPLETE_SUCCESS,
  FETCH_GRAPHCOMPLETE_FAILURE,
} from './constants';

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
  status: 'empty',
  dataSimple: false,
  loadingSimple: false,
  errorSimple: false,
  statusSimple: 'empty',
  dataComplete: false,
  loadingComplete: false,
  errorComplete: false,
  statusComplete: 'empty',
});

function dashboardContainerReducer(state = initialState, action = null) {
  switch (action.type) {
    // get data graph goride
    case FETCH_GRAPH_REQUEST:
      return state
        .set('loading', true)
        .set('status', 'loading')
        .set('data', false)
        .set('error', false);
    case FETCH_GRAPH_SUCCESS:
      return state
        .set('loading', false)
        .set('status', 'success')
        .set('data', fromJS(action.data))
        .set('error', false);
    case FETCH_GRAPH_FAILURE:
      return state
        .set('loading', false)
        .set('status', 'error')
        .set('data', fromJS(action.data))
        .set('error', true);
    // get data graph simple
    case FETCH_GRAPHSIMPLE_REQUEST:
      return state
        .set('loadingSimple', true)
        .set('statusSimple', 'loading')
        .set('dataSimple', false)
        .set('errorSimple', false);
    case FETCH_GRAPHSIMPLE_SUCCESS:
      return state
        .set('loadingSimple', false)
        .set('statusSimple', 'success')
        .set('dataSimple', fromJS(action.data))
        .set('errorSimple', false);
    case FETCH_GRAPHSIMPLE_FAILURE:
      return state
        .set('loadingSimple', false)
        .set('statusSimple', 'error')
        .set('dataSimple', fromJS(action.data))
        .set('errorSimple', true);
    // get data graph komplit
    case FETCH_GRAPHCOMPLETE_REQUEST:
      return state
        .set('loadingComplete', true)
        .set('statusComplete', 'loading')
        .set('dataComplete', false)
        .set('errorComplete', false);
    case FETCH_GRAPHCOMPLETE_SUCCESS:
      return state
        .set('loadingComplete', false)
        .set('statusComplete', 'success')
        .set('dataComplete', fromJS(action.data))
        .set('errorComplete', false);
    case FETCH_GRAPHCOMPLETE_FAILURE:
      return state
        .set('loadingComplete', false)
        .set('statusComplete', 'error')
        .set('dataComplete', fromJS(action.data))
        .set('errorComplete', true);
    default:
      return state;
  }
}

export default dashboardContainerReducer;
