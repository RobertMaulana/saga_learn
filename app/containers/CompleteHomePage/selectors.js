import { createSelector } from 'reselect';

/**
 * Direct selector to the completeHomePage state domain
 */
const selectCompleteHomePageDomain = () => state => state.get('completeHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CompleteHomePage
 */

const selectCompleteHomePage = () => createSelector(
  selectCompleteHomePageDomain(),
  (substate) => substate.toJS()
);

export default selectCompleteHomePage;
export {
  selectCompleteHomePageDomain,
};
