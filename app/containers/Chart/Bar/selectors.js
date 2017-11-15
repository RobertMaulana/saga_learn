import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardContainer state domain
 */
const selectDashboardContainer = () => state => state.get('dashboardContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardContainer
 */

// get Data Graph Goride
const selectLoading = () => createSelector(
  selectDashboardContainer(),
  (dashboardContainerState) => dashboardContainerState.get('loading'),
);

const selectError = () => createSelector(
  selectDashboardContainer(),
  (dashboardContainerState) => dashboardContainerState.get('error'),
);

const selectStatus = () => createSelector(
  selectDashboardContainer(),
  (dashboardContainerState) => dashboardContainerState.get('status'),
);

const selectData = () => createSelector(
  selectDashboardContainer(),
  (dashboardContainerState) => dashboardContainerState.get('data'),
);

// get Data Graph Simple
const selectLoadingSimple = () => createSelector(
  selectDashboardContainer(),
  (dashboardSimpleContainerState) => dashboardSimpleContainerState.get('loadingSimple'),
);

const selectErrorSimple = () => createSelector(
  selectDashboardContainer(),
  (dashboardSimpleContainerState) => dashboardSimpleContainerState.get('errorSimple'),
);

const selectStatusSimple = () => createSelector(
  selectDashboardContainer(),
  (dashboardSimpleContainerState) => dashboardSimpleContainerState.get('statusSimple'),
);

const selectDataSimple = () => createSelector(
  selectDashboardContainer(),
  (dashboardSimpleContainerState) => dashboardSimpleContainerState.get('dataSimple'),
);

// get Data Graph Complete
const selectLoadingComplete = () => createSelector(
  selectDashboardContainer(),
  (dashboardCompleteContainerState) => dashboardCompleteContainerState.get('loadingComplete'),
);

const selectErrorComplete = () => createSelector(
  selectDashboardContainer(),
  (dashboardCompleteContainerState) => dashboardCompleteContainerState.get('errorComplete'),
);

const selectStatusComplete = () => createSelector(
  selectDashboardContainer(),
  (dashboardCompleteContainerState) => dashboardCompleteContainerState.get('statusComplete'),
);

const selectDataComplete = () => createSelector(
  selectDashboardContainer(),
  (dashboardCompleteContainerState) => dashboardCompleteContainerState.get('dataComplete'),
);

export {
  selectDashboardContainer,
  selectLoading,
  selectError,
  selectStatus,
  selectData,
  selectLoadingSimple,
  selectErrorSimple,
  selectStatusSimple,
  selectDataSimple,
  selectLoadingComplete,
  selectErrorComplete,
  selectStatusComplete,
  selectDataComplete,
};
