import { createSelector } from 'reselect';

/**
 * Direct selector to the gorideHomePage state domain
 */
const selectGorideHomePageDomain = () => state => state.get('gorideHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GorideHomePage
 */

const selectGorideHomePage = () => createSelector(
  selectGorideHomePageDomain(),
  (substate) => substate.toJS()
);

export default selectGorideHomePage;
export {
  selectGorideHomePageDomain,
};
