import { createSelector } from 'reselect';

/**
 * Direct selector to the recordContainer state domain
 */
const selectRecordContainer = () => state => state.get('recordContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RecordContainer
 */

// view
const selectLoadingView = () => createSelector(
  selectRecordContainer(),
  (recordContainerState) => recordContainerState.get('loadingView'),
);

const selectErrorView = () => createSelector(
  selectRecordContainer(),
  (recordContainerState) => recordContainerState.get('errorView'),
);

const selectStatusView = () => createSelector(
  selectRecordContainer(),
  (recordContainerState) => recordContainerState.get('statusView'),
);

const selectDataView = () => createSelector(
  selectRecordContainer(),
  (recordContainerState) => recordContainerState.get('dataView'),
);

export {
  selectRecordContainer,
  selectLoadingView,
  selectErrorView,
  selectStatusView,
  selectDataView,
};
