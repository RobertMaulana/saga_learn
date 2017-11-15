import { createSelector } from 'reselect';

/**
 * Direct selector to the simpleHomePage state domain
 */
const selectSimpleHomePageDomain = () => state => state.get('simpleHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SimpleHomePage
 */

const selectSimpleHomePage = () => createSelector(
  selectSimpleHomePageDomain(),
  (substate) => substate.toJS()
);

export default selectSimpleHomePage;
export {
  selectSimpleHomePageDomain,
};
