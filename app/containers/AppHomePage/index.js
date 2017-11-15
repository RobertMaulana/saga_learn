/*
 *
 * AppHomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Dropzone from 'react-dropzone';
// import request from 'superagent';
// import { push } from 'react-router-redux';

import GorideHomePage from 'containers/GorideHomePage';
import SimpleHomePage from 'containers/SimpleHomePage';
import CompleteHomePage from 'containers/CompleteHomePage';
import NotFound from 'containers/NotFoundPage';

import styles from './styles.css';

export class AppHomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let ResultApp;
    localStorage.setItem('category', this.props.params.provide);
    switch (this.props.params.provide) {
      case 'goride':
        ResultApp = <GorideHomePage />;
        break;
      case 'simpel':
        ResultApp = <SimpleHomePage />;
        break;
      case 'komplit':
        ResultApp = <CompleteHomePage />;
        break;
      default:
        ResultApp = <NotFound />;
        break;
    }

    return (
      <div className={styles.appHomePage}>
        {ResultApp}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

AppHomePage.propTypes = {
  params: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(AppHomePage);
