// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'loginPageContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginPageContainer/reducer'),
          System.import('containers/LoginPageContainer/sagas'),
          System.import('containers/LoginPageContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPageContainer', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/:provide/home',
      name: 'appHomePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AppHomePage/reducer'),
          System.import('containers/AppHomePage/sagas'),
          System.import('containers/AppHomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('appHomePage', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/dashboard',
      name: 'dashboardContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DashboardContainer/reducer'),
          System.import('containers/DashboardContainer/sagas'),
          System.import('containers/DashboardContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dashboardContainer', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/status',
      name: 'statusContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/StatusContainer/reducer'),
          System.import('containers/StatusContainer/sagas'),
          System.import('containers/StatusContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('statusContainer', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {
      path: '/view/:filename',
      name: 'recordContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/RecordContainer/reducer'),
          System.import('containers/RecordContainer/sagas'),
          System.import('containers/RecordContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('recordContainer', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',

      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
