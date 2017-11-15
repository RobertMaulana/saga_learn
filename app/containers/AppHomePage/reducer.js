/*
 *
 * AppHomePage reducer
 *
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({
  data: false,
  loading: false,
  error: false,
  status: 'empty',
  dataTMI: false,
  loadingTMI: false,
  errorTMI: false,
  statusTMI: 'empty',
  dataInvoice: false,
  loadingInvoice: false,
  errorInvoice: false,
  statusInvoice: 'empty',
  dataAttachment: false,
  loadingAttachment: false,
  errorAttachment: false,
  statusAttachment: 'empty',
  dataJunk: false,
  loadingJunk: false,
  errorJunk: false,
  statusJunk: 'empty',
  dataAllJunk: false,
  loadingAllJunk: false,
  errorAllJunk: false,
  statusAllJunk: 'empty',
});

function appHomePageReducer(state = initialState, action = null) {
  switch (action.type) {
    // get data register
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
    // get data TMI
    case FETCH_DATA_REQUEST_TMI:
      return state
        .set('loadingTMI', true)
        .set('statusTMI', 'loading')
        .set('dataTMI', false)
        .set('errorTMI', false);
    case FETCH_DATA_SUCCESS_TMI:
      return state
        .set('loadingTMI', false)
        .set('statusTMI', 'success')
        .set('dataTMI', fromJS(action.data))
        .set('errorTMI', false);
    case FETCH_DATA_FAILURE_TMI:
      return state
        .set('loadingTMI', false)
        .set('statusTMI', 'error')
        .set('dataTMI', fromJS(action.data))
        .set('errorTMI', true);
    // get data Invoice
    case FETCH_DATA_REQUEST_INVOICE:
      return state
        .set('loadingInvoice', true)
        .set('statusInvoice', 'loading')
        .set('dataInvoice', false)
        .set('errorInvoice', false);
    case FETCH_DATA_SUCCESS_INVOICE:
      return state
        .set('loadingInvoice', false)
        .set('statusInvoice', 'success')
        .set('dataInvoice', fromJS(action.data))
        .set('errorInvoice', false);
    case FETCH_DATA_FAILURE_INVOICE:
      return state
        .set('loadingInvoice', false)
        .set('statusInvoice', 'error')
        .set('dataInvoice', fromJS(action.data))
        .set('errorInvoice', true);
    // get data Attachment
    case FETCH_DATA_REQUEST_ATTACHMENT:
      return state
        .set('loadingAttachment', true)
        .set('statusAttachment', 'loading')
        .set('dataAttachment', false)
        .set('errorAttachment', false);
    case FETCH_DATA_SUCCESS_ATTACHMENT:
      return state
        .set('loadingAttachment', false)
        .set('statusAttachment', 'success')
        .set('dataAttachment', fromJS(action.data))
        .set('errorAttachment', false);
    case FETCH_DATA_FAILURE_ATTACHMENT:
      return state
        .set('loadingAttachment', false)
        .set('statusAttachment', 'error')
        .set('dataAttachment', fromJS(action.data))
        .set('errorAttachment', true);
    // get data Junk
    case FETCH_DATA_REQUEST_JUNK:
      return state
        .set('loadingJunk', true)
        .set('statusJunk', 'loading')
        .set('dataJunk', false)
        .set('errorJunk', false);
    case FETCH_DATA_SUCCESS_JUNK:
      return state
        .set('loadingJunk', false)
        .set('statusJunk', 'success')
        .set('dataJunk', fromJS(action.data))
        .set('errorJunk', false);
    case FETCH_DATA_FAILURE_JUNK:
      return state
        .set('loadingJunk', false)
        .set('statusJunk', 'error')
        .set('dataJunk', fromJS(action.data))
        .set('errorJunk', true);
    // get data All Junk
    case FETCH_DATA_REQUEST_ALLJUNK:
      return state
        .set('loadingAllJunk', true)
        .set('statusAllJunk', 'loading')
        .set('dataAllJunk', false)
        .set('errorAllJunk', false);
    case FETCH_DATA_SUCCESS_ALLJUNK:
      return state
        .set('loadingAllJunk', false)
        .set('statusAllJunk', 'success')
        .set('dataAllJunk', fromJS(action.data))
        .set('errorAllJunk', false);
    case FETCH_DATA_FAILURE_ALLJUNK:
      return state
        .set('loadingAllJunk', false)
        .set('statusAllJunk', 'error')
        .set('dataAllJunk', fromJS(action.data))
        .set('errorAllJunk', true);
    default:
      return state;
  }
}

export default appHomePageReducer;
