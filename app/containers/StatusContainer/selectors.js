import { createSelector } from 'reselect';

/**
 * Direct selector to the statusContainer state domain
 */
const selectStatusContainer = () => state => state.get('statusContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StatusContainer
 */

// get Data
const selectLoading = () => createSelector(
  selectStatusContainer(),
  (statusContainerState) => statusContainerState.get('loading'),
);

const selectError = () => createSelector(
  selectStatusContainer(),
  (statusContainerState) => statusContainerState.get('error'),
);

const selectStatus = () => createSelector(
  selectStatusContainer(),
  (statusContainerState) => statusContainerState.get('status'),
);

const selectData = () => createSelector(
  selectStatusContainer(),
  (statusContainerState) => statusContainerState.get('data'),
);

// delete
const selectLoadingDelete = () => createSelector(
  selectStatusContainer(),
  (statusContainerDeleteState) => statusContainerDeleteState.get('loadingDelete'),
);

const selectErrorDelete = () => createSelector(
  selectStatusContainer(),
  (statusContainerDeleteState) => statusContainerDeleteState.get('errorDelete'),
);

const selectStatusDelete = () => createSelector(
  selectStatusContainer(),
  (statusContainerDeleteState) => statusContainerDeleteState.get('statusDelete'),
);

const selectDataDelete = () => createSelector(
  selectStatusContainer(),
  (statusContainerDeleteState) => statusContainerDeleteState.get('dataDelete'),
);

// authorize
const selectLoadingAuthorize = () => createSelector(
  selectStatusContainer(),
  (statusContainerAuthorizeState) => statusContainerAuthorizeState.get('loadingAuthorize'),
);

const selectErrorAuthorize = () => createSelector(
  selectStatusContainer(),
  (statusContainerAuthorizeState) => statusContainerAuthorizeState.get('errorDeleteAuthorize'),
);

const selectStatusAuthorize = () => createSelector(
  selectStatusContainer(),
  (statusContainerAuthorizeState) => statusContainerAuthorizeState.get('statusDeleteAuthorize'),
);

const selectDataAuthorize = () => createSelector(
  selectStatusContainer(),
  (statusContainerAuthorizeState) => statusContainerAuthorizeState.get('dataDeleteAuthorize'),
);

export {
  selectStatusContainer,
  selectLoading,
  selectError,
  selectStatus,
  selectData,
  selectLoadingDelete,
  selectErrorDelete,
  selectStatusDelete,
  selectDataDelete,
  selectLoadingAuthorize,
  selectErrorAuthorize,
  selectStatusAuthorize,
  selectDataAuthorize,
};
