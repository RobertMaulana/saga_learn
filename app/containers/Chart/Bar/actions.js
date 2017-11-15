/*
 *
 * DashboardContainer actions
 *
 */

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

// get data graph goride
export function fetchGraphRequest() {
  return {
    type: FETCH_GRAPH_REQUEST,
  };
}

export function fetchGraphSuccess(data) {
  return {
    type: FETCH_GRAPH_SUCCESS,
    data,
  };
}

export function fetchGraphFailure(data) {
  return {
    type: FETCH_GRAPH_FAILURE,
    data,
  };
}

// get data graph gocar simple
export function fetchGraphSimpleRequest() {
  return {
    type: FETCH_GRAPHSIMPLE_REQUEST,
  };
}

export function fetchGraphSimpleSuccess(data) {
  return {
    type: FETCH_GRAPHSIMPLE_SUCCESS,
    data,
  };
}

export function fetchGraphSimpleFailure(data) {
  return {
    type: FETCH_GRAPHSIMPLE_FAILURE,
    data,
  };
}

// get data graph komplit
export function fetchGraphCompleteRequest() {
  return {
    type: FETCH_GRAPHCOMPLETE_REQUEST,
  };
}

export function fetchGraphCompleteSuccess(data) {
  return {
    type: FETCH_GRAPHCOMPLETE_SUCCESS,
    data,
  };
}

export function fetchGraphCompleteFailure(data) {
  return {
    type: FETCH_GRAPHCOMPLETE_FAILURE,
    data,
  };
}
