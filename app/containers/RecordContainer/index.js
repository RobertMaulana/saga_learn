/*
 *
 * RecordContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import selectRecordContainer from './selectors';
import {
  viewDataRequest,
} from './actions';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import request from 'superagent';

import FormButton from 'components/FormButton';

import {
  selectLoadingView,
  selectErrorView,
  selectStatusView,
  selectDataView,
} from './selectors';

import styles from './styles.css';

export class RecordContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.viewDataRequest();
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

  openFileStatus = () => {
    this.openRoute('/status');
  }

  discard = (filename, model) => {
    const url = getBaseUri + model + '/discard';
    console.log(url);

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
      } else {
        alert('File failed to discarded');
      }

      window.location.href = '/status';
    });
  }

  authorize = (filename, model) => {
    const url = this.getBaseUri() + model + '/authorize';
    console.log(url);

    const req = request.post(url);
    req.send({
      fileName: filename
    });
    req.end((err, res) => {
      if (err) {
        console.log(err);
      }

      const response = JSON.parse(res.text);
      if (response.status == 0) {
        alert('File successfully authorized');
      } else {
        alert('File failed to authorized');
      }

      window.location.href = '/status';
    });    
  }

  getProductType = (model) => {
    let productType;
    if (model == 'goRideTrxMaster') {
      productType = 'goridetrx';
    } else if (model == 'goCarSimpleTrxMaster') {
      productType = 'gocarsimpletrx';
    } else if (model == 'goCarCompleteTrxMaster') {
      productType = 'gocarcompletetrx';
    }

    return productType;
  }

  render() {
    const policies = JSON.parse(this.props.dataView);
    let fileStatus = localStorage.getItem('status');
    let dataValue;
    if (this.props.dataView !== false && this.props.statusView === 'success') {
      dataValue = policies.map((data, i) =>
        <tr key={i}>
          {data['validationStatus'] ? <td className={styles.rowError}>{i + 1}</td> : <td>{i + 1}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['registrationDate']}</td> : <td>{data['registrationDate']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['goProteksiPolicyNumber']}</td> : <td>{data['goProteksiPolicyNumber']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['driverFullName']}</td> : <td>{data['driverFullName']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['gojekID']}</td> : <td>{data['gojekID']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['driverLicenseNumber']}</td> : <td>{data['driverLicenseNumber']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['vehiclePlateNumber']}</td> : <td>{data['vehiclePlateNumber']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['vehicleYear']}</td> : <td>{data['vehicleYear']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['emailAddress']}</td> : <td>{data['emailAddress']}</td>}
          {data['validationStatus'] ? <td className={styles.rowError}>{data['phoneNumber']}</td> : <td>{data['phoneNumber']}</td>}
        </tr>
      );
    }

    let resultAuth;
    if (localStorage.getItem('role') !== null) {
      resultAuth = (
        <div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonDivider}>
              <FormButton name="submit" value="Back to list" handleRoute={this.openFileStatus} />
            </div>
            { fileStatus === 'WAITING AUTHORIZATION' ? 
              <div className={styles.buttonActionContainer}>
                <div className={styles.buttonDivider}>
                  <FormButton name="submit" value="Discard" handleRoute={this.discard.bind(this, localStorage.getItem('filename'), this.getProductType(localStorage.getItem('model')))}/>
                </div>
                <div className={styles.buttonDivider}>
                  <FormButton name="submit" value="Upload" handleRoute={this.authorize.bind(this, localStorage.getItem('filename'), this.getProductType(localStorage.getItem('model')))}/>
                </div>
              </div> : '' }
          </div>
          <div className={styles.container}>
            <table cellpadding="5" cellspacing="0" border="1">
              <tr className={styles.header}>
                <td>No</td>
                <td>Registration Date</td>
                <td>Policy ID</td>
                <td>Nama Driver</td>
                <td>Gojek ID</td>
                <td>SIM</td>
                <td>Plate Number</td>
                <td>Tahun Kendaraan</td>
                <td>Email</td>
                <td>No Telepon</td>
              </tr>
              {dataValue}
            </table>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonDivider}>
              <FormButton name="submit" value="Back to list" handleRoute={this.openFileStatus} />
            </div>
            { fileStatus === 'WAITING AUTHORIZATION' ? 
              <div className={styles.buttonActionContainer}>
                <div className={styles.buttonDivider}>
                  <FormButton name="submit" value="Discard" handleRoute={this.discard.bind(this, localStorage.getItem('filename'))}/>
                </div>
                <div className={styles.buttonDivider}>
                  <FormButton name="submit" value="Upload" handleRoute={this.authorize.bind(this, localStorage.getItem('filename'))}/>
                </div>
              </div> : '' }
          </div>
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
      <div className={styles.recordContainer}>
        {resultAuth}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataView: selectDataView(),
  loadingView: selectLoadingView(),
  errorView: selectErrorView(),
  statusView: selectStatusView(),
});

function mapDispatchToProps(dispatch) {
  return {
    viewDataRequest: () => dispatch(viewDataRequest()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

RecordContainer.propTypes = {
  viewDataRequest: React.PropTypes.func,
  loadingView: PropTypes.bool,
  errorView: PropTypes.bool,
  statusView: PropTypes.string,
  dataView: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer);
