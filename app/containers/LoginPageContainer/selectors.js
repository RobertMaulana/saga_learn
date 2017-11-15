import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPageContainer state domain
 */
const selectLoginPageContainer = () => state => state.get('loginPageContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginPageContainer
 */

// get Data Register
const selectLoading = () => createSelector(
  selectLoginPageContainer(),
  (loginPageContainerState) => loginPageContainerState.get('loading'),
);

const selectError = () => createSelector(
  selectLoginPageContainer(),
  (loginPageContainerState) => loginPageContainerState.get('error'),
);

const selectStatus = () => createSelector(
  selectLoginPageContainer(),
  (loginPageContainerState) => loginPageContainerState.get('status'),
);

const selectData = () => createSelector(
  selectLoginPageContainer(),
  (loginPageContainerState) => loginPageContainerState.get('data'),
);

export {
  selectLoginPageContainer,
  selectLoading,
  selectError,
  selectStatus,
  selectData,
};
