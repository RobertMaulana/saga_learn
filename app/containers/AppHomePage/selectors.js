import { createSelector } from 'reselect';

/**
 * Direct selector to the appHomePage state domain
 */
const selectAppHomePage = () => state => state.get('appHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppHomePage
 */

// get Data Register
const selectLoading = () => createSelector(
  selectAppHomePage(),
  (appHomePageState) => appHomePageState.get('loading'),
);

const selectError = () => createSelector(
  selectAppHomePage(),
  (appHomePageState) => appHomePageState.get('error'),
);

const selectStatus = () => createSelector(
  selectAppHomePage(),
  (appHomePageState) => appHomePageState.get('status'),
);

const selectData = () => createSelector(
  selectAppHomePage(),
  (appHomePageState) => appHomePageState.get('data'),
);

// get Data TMI
const selectLoadingTMI = () => createSelector(
  selectAppHomePage(),
  (appHomePageTMIState) => appHomePageTMIState.get('loadingTMI'),
);

const selectErrorTMI = () => createSelector(
  selectAppHomePage(),
  (appHomePageTMIState) => appHomePageTMIState.get('errorTMI'),
);

const selectStatusTMI = () => createSelector(
  selectAppHomePage(),
  (appHomePageTMIState) => appHomePageTMIState.get('statusTMI'),
);

const selectDataTMI = () => createSelector(
  selectAppHomePage(),
  (appHomePageTMIState) => appHomePageTMIState.get('dataTMI'),
);

// get Data Invoice
const selectLoadingInvoice = () => createSelector(
  selectAppHomePage(),
  (appHomePageInvoiceState) => appHomePageInvoiceState.get('loadingInvoice'),
);

const selectErrorInvoice = () => createSelector(
  selectAppHomePage(),
  (appHomePageInvoiceState) => appHomePageInvoiceState.get('errorInvoice'),
);

const selectStatusInvoice = () => createSelector(
  selectAppHomePage(),
  (appHomePageInvoiceState) => appHomePageInvoiceState.get('statusInvoice'),
);

const selectDataInvoice = () => createSelector(
  selectAppHomePage(),
  (appHomePageInvoiceState) => appHomePageInvoiceState.get('dataInvoice'),
);

// get Data Attachment
const selectLoadingAttachment = () => createSelector(
  selectAppHomePage(),
  (appHomePageAttachmentState) => appHomePageAttachmentState.get('loadingAttachment'),
);

const selectErrorAttachment = () => createSelector(
  selectAppHomePage(),
  (appHomePageAttachmentState) => appHomePageAttachmentState.get('errorAttachment'),
);

const selectStatusAttachment = () => createSelector(
  selectAppHomePage(),
  (appHomePageAttachmentState) => appHomePageAttachmentState.get('statusAttachment'),
);

const selectDataAttachment = () => createSelector(
  selectAppHomePage(),
  (appHomePageAttachmentState) => appHomePageAttachmentState.get('dataAttachment'),
);

// get Data Junk
const selectLoadingJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageJunkState) => appHomePageJunkState.get('loadingJunk'),
);

const selectErrorJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageJunkState) => appHomePageJunkState.get('errorJunk'),
);

const selectStatusJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageJunkState) => appHomePageJunkState.get('statusJunk'),
);

const selectDataJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageJunkState) => appHomePageJunkState.get('dataJunk'),
);

// get Data All Junk
const selectLoadingAllJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageAllJunkState) => appHomePageAllJunkState.get('loadingAllJunk'),
);

const selectErrorAllJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageAllJunkState) => appHomePageAllJunkState.get('errorAllJunk'),
);

const selectStatusAllJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageAllJunkState) => appHomePageAllJunkState.get('statusAllJunk'),
);

const selectDataAllJunk = () => createSelector(
  selectAppHomePage(),
  (appHomePageAllJunkState) => appHomePageAllJunkState.get('dataAllJunk'),
);

export {
  selectAppHomePage,
  selectLoading,
  selectError,
  selectStatus,
  selectData,
  selectLoadingTMI,
  selectErrorTMI,
  selectStatusTMI,
  selectDataTMI,
  selectLoadingInvoice,
  selectErrorInvoice,
  selectStatusInvoice,
  selectDataInvoice,
  selectLoadingAttachment,
  selectErrorAttachment,
  selectStatusAttachment,
  selectDataAttachment,
  selectLoadingJunk,
  selectErrorJunk,
  selectStatusJunk,
  selectDataJunk,
  selectLoadingAllJunk,
  selectErrorAllJunk,
  selectStatusAllJunk,
  selectDataAllJunk,
};
