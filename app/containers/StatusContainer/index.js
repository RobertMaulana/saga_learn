/*
 * @flow weak
 * StatusContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import selectStatusContainer from './selectors';
import {
  fetchDataRequest,
} from './actions';
import { createStructuredSelector } from 'reselect';
import request from 'superagent';
import moment from 'moment';

import {
  selectLoading,
  selectError,
  selectStatus,
  selectData,
} from './selectors';

import styles from './styles.css';
// import Table from 'components/Table';

export class StatusContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.fetchDataRequest();
  }

  getBaseUri = () => {
    const baseUri = 'http://localhost:50010/api/';
    return baseUri;
  }

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  login = () => {
    this.openRoute('/');
  }

  authorize = (filename) => {
    localStorage.setItem('filename', filename);
    setTimeout(function(){
      alert("Hello");
    }, 3000);
  }

  view = (filename, model, status) => {
    localStorage.setItem('filename', filename);
    localStorage.setItem('model', model);
    localStorage.setItem('status', status);
    this.openRoute(`/view/${filename}`);
  }

  discard = (filename, model) => {
    const url = this.getBaseUri() + model + '/discard';
    const req = request.post(url);
    req.send({
      fileName: filename
    });
    req.end((err, res) => {
      if (err) {
        console.log(err);
      }

      const response = JSON.parse(res.text);
      if (response.status === 0) {
        alert('File successfully discarded');
      } else if (response.status === 1) {
        alert('File failed to discarded');
      }

      window.location.href = '/status';
    });
  }

  authorize = (filename, model) => {
    const url = this.getBaseUri() + 'v2/authorize';
    const req = request.post(url);
    req.send({
      fileName: filename,
      model
    });
    req.end((err, res) => {
      if (err) {
        console.log(err);
      }

      const response = JSON.parse(res.text);
      if (response.status === 0) {
        alert('File successfully authorized');
      } else if (response.status === 1) {
        alert('File failed to authorized');
      }

      window.location.href = '/status';
    });
  }

  getModelType = (model) => {
    let result = '';

    if (model === 'goRideTrxMaster') {
      result = 'GORIDE';
    } else if (model === 'goCarSimpleTrxMaster') {
      result = 'Simpel';
    } else if (model === 'goCarCompleteTrxMaster') {
      result = 'Komplit'
    }

    return result;
  }

  render() {
    const policies = JSON.parse(this.props.data);
    let dataValue;
    if (this.props.data !== false && this.props.status === 'success') {
      dataValue = policies.map((data, i) =>
        <tr key={i}>
          <td>{moment(data['createdAt']).format('DD-MMM-YYYY')}</td>
          <td>{data['originalFileName']}</td>
          <td>{this.getModelType(data['model'])}</td>
          <td>{data['recordStatus'] ? data['recordStatus'].total : 0}</td>
          <td>{data['recordStatus'] ? data['recordStatus'].duplicate : 0}</td>
          <td>{data['status'] ? data['status'] : 'UNKNOWN'}</td>
          <td>{data['status'] ? <span onClick={this.view.bind(this, data['fileName'], data['model'], data['status'])}>View</span> : ''}</td>
          <td>{data['status'] === 'WAITING AUTHORIZATION' ? <span onClick={this.discard.bind(this, data.fileName, data.model)}>Discard</span> : ''}</td>
          <td>{data['status'] === 'WAITING AUTHORIZATION' ? <span onClick={this.authorize.bind(this, data.fileName, data.model)}>Authorize</span> : ''}</td>
        </tr>
      );
    }

    let resultAuth;
    if (localStorage.getItem('role') !== null) {
      resultAuth = (
        <div className={styles.container}>
          <table cellpadding="5" cellspacing="0" border="1">
            <tr className={styles.header}>
              <td>Tanggal</td>
              <td>Nama File</td>
              <td>File Type</td>
              <td>Total</td>
              <td>Duplikat</td>
              <td>Status</td>
              <td colSpan="3">Action</td>
            </tr>
            {dataValue}
          </table>
        </div>
      );
    } else {
      resultAuth = (
        <div className={styles.containerInfo}>
          <div className={styles.loginInfo}>Silahkan Login Terlebih Dahulu, <span className={styles.logout} onClick={this.login}>Login</span></div>
        </div>
      );
    }
    return (
      <div className={styles.statusContainer}>
        {resultAuth}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  loading: selectLoading(),
  error: selectError(),
  status: selectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    fetchDataRequest: () => dispatch(fetchDataRequest()),
    dispatch,
  };
}

StatusContainer.propTypes = {
  changeRoute: PropTypes.func,
  fetchDataRequest: React.PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  status: PropTypes.string,
  data: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);
