/** SimpleHomePage **/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { HashLoader, ClipLoader } from 'react-spinners';
import swal from 'sweetalert2';

import {
  fetchDataRequest,
  fetchDataRequestTMI,
  fetchDataRequestInvoice,
  fetchDataRequestAttachment,
  fetchDataRequestJunk,
  fetchDataRequestAllJunk,
} from 'containers/AppHomePage/actions';
import sendAPI from '../../utils/send-api';

import {
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
} from 'containers/AppHomePage/selectors';

import FormButton from 'components/FormButton';
// import FormUpload from 'components/FormUpload';
import FormDatePicker from 'components/FormDatePicker';
import FormDropdownInput from 'components/FormDropdownInput';
import FormTextInput from 'components/FormTextInput';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import APIBase from '../../../internals/api-base';

import styles from './styles.css';
import './spinner.css';

/** eslint-disable-line react/prefer-stateless-function **/
export class SimpleHomePage extends React.Component {

  constructor( props ) {
    super( props );
    this.onDrop = this.onDrop.bind( this );
    this.state = {
      files         : false,
      filesCleansing: false,
      loading       : false,
      loadingBill   : false,
      data          : [],
      error         : [],
      connection    : [],
      spinner       : false,
      duplicated    : ''
    };
  }

  resultFieldDetector( errorField ) {
    let duplicated = [];

    errorField.map((el, index, array) => {
      if (el.Duplicated) {
        duplicated.push(el.Duplicated)
      }
    })
    var unique = duplicated.filter((v, i, a) => a.indexOf(v) === i);

    this.setState({
      duplicated: unique.toString()
    })

    this.setState(
      { error: errorField.map(( da, i ) => {
          if ( da ) {
            return Object.assign({}, { "field": da });
          }
      })
    });

  }

  onDrop = ( acceptedFiles ) => {
    this.setState({
      files   : acceptedFiles,
      loading : true,
      spinner: true
    });

    const req = request.post(`${APIBase}/api/v2/goproteksi-simpel/upload`);
    acceptedFiles.forEach(( file ) => {
      req.attach( 'file', file, file.name );
    });
    let loadingState;
    let data = [];
    req.end(( err, res ) => {

      const response = JSON.parse( res.text );

      if (err || !res.ok || response.status === 1) {

        this.resultFieldDetector( response.error );

        swal({
          title           : `Failed upload to server`,
          text            : `Please check your data!`,
          type            : 'error',
          showCancelButton: false,
        })

        this.setState({
          spinner: false
        });

        loadingState = false;

      } else if ( response.status === 2 ) {

        swal({
          title           : `${response.errorMessage}`,
          text            : '',
          type            : 'warning',
          showCancelButton: false,
        })

        this.setState({
          spinner: false
        });

        loadingState = false;

      } else if ( !err || res.ok || response.status === 0 ) {
        // console.log('success upload to server' + '\n' + 'Duplicate : ' + response.count.duplicate + '\n' + 'Saved : ' + response.count.total);
        swal({
          title           : `Success upload to server`,
          text            : `Sending and checking data to Sinarmas`,
          type            : 'success',
          showCancelButton: false,
        })

        this.setState({
          spinner: false
        });

        if ( response.data && response.data.length ) {

          this.setState({
            data: [].concat(this.state.data, response.data.map((dat) => Object.assign({}, dat, { status: 'SENDING' }))),
            fetchToAPI: true
          });

          /** Send data to sinarmas API **/
          if ( this.state.data && this.state.data.length ) {

            this.state.data.map(( dat, key ) => {

              sendAPI(false, dat, ( resul ) => {

                const result = resul.response;
                console.log(result);
                if (result.ErrorCode === '0') {

                  this.setState({
                    data: this.state.data.map((da, i) => {
                      if (i === key) {
                        return Object.assign({}, da, { status: 'SUCCESS', noPolis: result.PolicyInsuranceNo });
                      }
                      return da;
                    })
                  });

                } else if(result.ErrorCode === '1') {

                  this.setState({
                    data: this.state.data.map((da, i) => {
                      if (i === key) {
                        return Object.assign({}, da, { status: 'ERROR', description: result.ErrorMessage });
                      }
                      return da;
                    })
                  });

                } else {
                  this.setState({
                    data: this.state.data.map((da, i) => {
                      if (i === key) {
                        return Object.assign({}, da, { status: 'BAD', connection: "Can not connect to Sinarmas" });
                      }
                      return da;
                    })
                  });
                }
              });
            });
          }
        }
        this.setState({fetchToAPI: false});
        loadingState = false;
      }
      this.setState({
        loading: loadingState
      });
      // window.location.href = '/status';
    });
  }

  onDropCleansing = ( acceptedFiles ) => {
    this.setState({
      filesCleansing: acceptedFiles,
      loadingBill   : true,
    });

    const req = request.post(`${APIBase}/api/gocarsimplebilling/upload`);

    acceptedFiles.forEach((file) => {
      req.attach('file', file, file.name);
    });

    let loadingState;
    req.end(( err, res ) => {

      const response = JSON.parse(res.text);

      if ( err || !res.ok || response.status === 1 ) {

        console.log(`erorr ${err}`);
        alert('failed upload to server');
        loadingState = false;

      } else if ( response.status === 2 ) {

        console.log(response.errorMessage);
        alert(response.errorMessage);
        loadingState = false;

      } else if ( !err || res.ok || response.status === 0 ) {

        console.log('success');
        alert('success upload to server' + '\n' + 'Paid : ' + response.paid + '\n' + 'Lapse : ' + response.lapse + '\n' + 'Notfound : ' + response.notFound);
        loadingState = false;

      }
      this.setState({ loadingBill: loadingState });
    });
  }

  openRoute = ( route ) => {
    this.props.changeRoute( route );
  };

  donwloadFile = () => {
    this.props.fetchDataRequest();
  }

  donwloadFileTMI = () => {
    this.props.fetchDataRequestTMI();
  }

  donwloadFileInvoice = () => {
    this.props.fetchDataRequestInvoice();
  }

  donwloadFileAttachment = () => {
    this.props.fetchDataRequestAttachment();
  }

  donwloadFileJunk = () => {
    this.props.fetchDataRequestJunk();
  }

  donwloadFileAllJunk = () => {
    this.props.fetchDataRequestAllJunk();
  }

  logout = () => {
    localStorage.removeItem( 'role' );
    localStorage.removeItem( 'user' );
    localStorage.removeItem( 'username' );
    localStorage.removeItem( 'password' );
    localStorage.removeItem( 'passwordShouldMinimize' );
    localStorage.removeItem( 'usernameShouldMinimize' );
    this.openRoute( '/' );
  }

  login = () => {
    this.openRoute( '/' );
  }

  render() {
    const { spinner, fetchToAPI } = this.state;
    const dataMonth = [['01', 'Januari'], ['02', 'Februari'], ['03', 'Maret'], ['04', 'April'], ['05', 'Mei'], ['06', 'Juni'], ['07', 'Juli'], ['08', 'Agustus'], ['09', 'September'], ['10', 'Oktober'], ['11', 'November'], ['12', 'Desember']];
    let fileName;
    let data;
    if ( this.state.files !== false ) {
      fileName = this.state.files[0].name;
    }
    let fileNameCleansing;
    if ( this.state.filesCleansing !== false ) {
      fileNameCleansing = this.state.filesCleansing[0].name;
    }

    /**
      get data register
      Show a loading indicator when we're loading
    **/
    let Result;
    if ( this.props.loading === true ) {
      Result = (<List component={LoadingIndicator} />);
    /**
      Show an error if there is one
    **/
    } else if ( this.props.error === true && this.props.status === 'error' ) {
      const ErrorComponent = () => (
        <ListItem item={ 'Something went wrong, please try again!' } />
      );
      Result = (<List component={ ErrorComponent } />);
      /**
        If we're not loading, don't have an error and there are repos, show the repos
      **/
    } else if ( this.props.loading === false && this.props.status === 'success' && this.props.data !== false ) {
      const test = JSON.parse( this.props.data );
      data = test.fileContents;
      /**
        const csvURL = window.URL.createObjectURL(data);
        window.open(csvURL);
      **/

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild( element );
      element.setAttribute( 'id', 'register' );
      element.setAttribute( 'href', window.URL.createObjectURL(blob) );
      element.setAttribute( 'download', 'register.csv' );
      element.style.display = '';
      element.click();
      document.body.removeChild( element );
      window.location.reload( true );
      Result = '';
    }

    /**
      get data TMI
    **/
    let ResultTMI;
    if (this.props.loadingTMI === true) {
      ResultTMI = (<List component={LoadingIndicator} />);

    /**
      Show an error if there is one
    **/
    } else if (this.props.errorTMI === true && this.props.statusTMI === 'error') {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      ResultTMI = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.loadingTMI === false && this.props.statusTMI === 'success' && this.props.dataTMI !== false) {
      const test = JSON.parse(this.props.dataTMI);
      data = test.fileContents;
      /* const csvURL = window.URL.createObjectURL(data);
      window.open(csvURL); */

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('id', 'report');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', 'report.csv');
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      window.location.reload(true);
    }

    // get data Invoice
    let ResultInvoice;
    if (this.props.loadingInvoice === true) {
      ResultInvoice = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.errorInvoice === true && this.props.statusInvoice === 'error') {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      ResultInvoice = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.loadingInvoice === false && this.props.statusInvoice === 'success' && this.props.dataInvoice !== false) {
      const test = JSON.parse(this.props.dataInvoice);
      data = test.fileContents;
      /* const csvURL = window.URL.createObjectURL(data);
      window.open(csvURL); */

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('id', 'invoice');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', 'invoice.csv');
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      window.location.reload(true);
    }

    // get data Attachment
    let ResultAttachment;
    if (this.props.loadingAttachment === true) {
      ResultAttachment = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.errorAttachment === true && this.props.statusAttachment === 'error') {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      ResultAttachment = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.loadingAttachment === false && this.props.statusAttachment === 'success' && this.props.dataAttachment !== false) {
      const test = JSON.parse(this.props.dataAttachment);
      data = test.fileContents;
      /* const csvURL = window.URL.createObjectURL(data);
      window.open(csvURL); */

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('id', 'attachment');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', 'attachment.csv');
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      window.location.reload(true);
    }

    // get data Junk
    let ResultJunk;
    if (this.props.loadingJunk === true) {
      ResultJunk = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.errorJunk === true && this.props.statusJunk === 'error') {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      ResultJunk = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.loadingJunk === false && this.props.statusJunk === 'success' && this.props.dataJunk !== false) {
      const test = JSON.parse(this.props.dataJunk);
      data = test.fileContents;
      /* const csvURL = window.URL.createObjectURL(data);
      window.open(csvURL); */

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('id', 'junk');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', 'junk.csv');
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      window.location.reload(true);
    }

    // get data All Junk
    let ResultAllJunk;
    if (this.props.loadingAllJunk === true) {
      ResultAllJunk = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.errorAllJunk === true && this.props.statusAllJunk === 'error') {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      ResultAllJunk = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.loadingAllJunk === false && this.props.statusAllJunk === 'success' && this.props.dataAllJunk !== false) {
      const test = JSON.parse(this.props.dataAllJunk);
      data = test.fileContents;
      /* const csvURL = window.URL.createObjectURL(data);
      window.open(csvURL); */

      const blob = new Blob([data], {
        type: 'text/csv;charset=utf8;',
      });

      // create hidden link
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('id', 'alljunk');
      element.setAttribute('href', window.URL.createObjectURL(blob));
      element.setAttribute('download', 'alljunk.csv');
      element.style.display = '';

      element.click();

      document.body.removeChild(element);
      window.location.reload(true);
    }

    let resutAuth;
    let resultLoading;
    let resultLoadingBill;

    if (this.state.loading) {
      // resultLoading = (
      //   <List component={LoadingIndicator} />
      // );
      resultLoading = "";
    } else if (this.state.files.length > 0) {
      resultLoading = (
        <div>
          {this.state.files.length} file choosen <br />
          Filename : {fileName}
        </div>
      );
    } else {
      resultLoading = (
        <div>Try dropping some files here, or click to select files to upload.</div>
      );
    }

    if (this.state.loadingBill) {
      resultLoadingBill = (
        <List component={LoadingIndicator} />
      );
    } else if (this.state.filesCleansing.length > 0) {
      resultLoadingBill = (
        <div>
          {this.state.filesCleansing.length} file choosen <br />
          Filename : {fileNameCleansing}
        </div>
      );
    } else {
      resultLoadingBill = (
        <div>Try dropping some files here, or click to select files to upload.</div>
      );
    }

    if (localStorage.getItem('role') === 'ADMIN') {
      resutAuth = (
        <div>
          {(spinner) ? (
            <div className={styles.sweetLoading}>
              <HashLoader
                color={'#F6D200'}
                loading={spinner}
              />
              <div className={styles.leftMargin}>
                <h4>Scanning your document...</h4>
              </div>
            </div>
          ) : ''}
          {(fetchToAPI) ? (
            <div className={styles.sweetLoading}>
              <HashLoader
                color={'#F6D200'}
                loading={spinner}
              />
              <div className={styles.leftMargin}>
                <h4>Sending data to sinarmas...</h4>
              </div>
            </div>
          ) : ''}
          <div className={styles.loginInfo}>Selamat Datang {localStorage.getItem('user')} di Simple Report</div>
          <div className={styles.containerUpload}>
            <div className="grid grid--center">
              <div className="1/2--desk grid__cell">
                <div className={styles.title}>Upload Daily</div>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} accept=".csv" className={styles.boxFile}>
                    {resultLoading}
                </Dropzone>
              </div>
              <div className="1/2--desk grid__cell">
                <div className={styles.title}>Upload Cleansing & Bill</div>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDropCleansing} accept=".csv" className={styles.boxFile}>
                    {resultLoadingBill}
                </Dropzone>
              </div>
            </div>
          </div>
          {(this.state.duplicated) ? (<div><h5 style={errorStyle}>Duplicated row: </h5>{this.state.duplicated}</div>) : ''}
          {this.state.data && this.state.data.length ? (
            <div>
              <div className={styles.integrationProgress}>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        Tanggal Registrasi
                      </th>
                      <th>
                        Nama
                      </th>
                      <th>
                        Email
                      </th>
                      <th>
                        Status Data
                      </th>
                      <th>
                        Deskripsi
                      </th>
                    </tr>
                    {this.state.data.map((data) => {
                      return (
                        <tr>
                          <td>
                            {data.registrationDate}
                          </td>
                          <td>
                            {data.driverFullName}
                          </td>
                          <td>
                            {data.emailAddress}
                          </td>
                          <td>
                            {data.status === 'SENDING' ? (<ClipLoader color={'#000'} loading={true}/>) : null}
                            {data.status === 'SUCCESS' ? (<h5 style={successStyle}>{`Data terkirim. No polis: ${data.noPolis}`}</h5>) : null}
                            {data.status === 'ERROR' ? 'Data gagal terkirim' : null}
                            {data.status === 'BAD' ? 'Check your internet connection' : null}
                          </td>
                          <td>
                            {(data.description) ? (<h5 style={errorStyle}>{data.description}</h5>) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {this.state.error && this.state.error.length ? (
            <div>
              <div className={styles.integrationProgress}>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        Error Pada Field
                      </th>
                      <th>
                        Baris
                      </th>
                    </tr>
                    {this.state.error.map((err, index) => {
                      if (!err.field.Duplicated) {
                        return (
                          <tr key={index}>
                            <td>
                              {(err.field["Registration Date"]) ? (<h5 style={errorStyle}>Registration Date</h5>) : ''}
                              {(err.field["Certificate No."]) ? (<h5 style={errorStyle}>Certificate No.</h5>) : ''}
                              {(err.field["Driver Name"]) ? (<h5 style={errorStyle}>Driver Name</h5>) : ''}
                              {(err.field["Tanggal Lahir"]) ? (<h5 style={errorStyle}>Tanggal Lahir</h5>) : ''}
                              {(err.field["Plat Nomor"]) ? (<h5 style={errorStyle}>Plat Nomor</h5>) : ''}
                              {(err.field["Tahun Kendaraan"]) ? (<h5 style={errorStyle}>Tahun Kendaraan</h5>) : ''}
                              {(err.field["Merk Kendaraan"]) ? (<h5 style={errorStyle}>Merk Kendaraan</h5>) : ''}
                              {(err.field["Email"]) ? (<h5 style={errorStyle}>Email</h5>) : ''}
                              {(err.field["Premi/bulan"]) ? (<h5 style={errorStyle}>Premi/bulan</h5>) : ''}
                              {(err.field["Insurance Specialist"]) ? (<h5 style={errorStyle}>Insurance Specialist</h5>) : ''}
                              {(err.field["SIM"]) ? (<h5 style={errorStyle}>SIM</h5>) : ''}
                              {(err.field["Ahli Waris"]) ? (<h5 style={errorStyle}>Ahli Waris</h5>) : ''}
                              {(err.field["Phone No."]) ? (<h5 style={errorStyle}>Phone No.</h5>) : ''}
                              {(err.field["No Rangka"]) ? (<h5 style={errorStyle}>No Rangka</h5>) : ''}
                              {(err.field["No Mesin"]) ? (<h5 style={errorStyle}>No Mesin</h5>) : ''}
                            </td>
                            <td>
                              {(err.field["Registration Date"]) ? (err.field["Registration Date"]) : ''}
                              {(err.field["Certificate No."]) ? (err.field["Certificate No."]) : ''}
                              {(err.field["Driver Name"]) ? (err.field["Driver Name"]) : ''}
                              {(err.field["Tanggal Lahir"]) ? (err.field["Tanggal Lahir"]) : ''}
                              {(err.field["Plat Nomor"]) ? (err.field["Plat Nomor"]) : ''}
                              {(err.field["Tahun Kendaraan"]) ? (err.field["Tahun Kendaraan"]) : ''}
                              {(err.field["Merk Kendaraan"]) ? (err.field["Merk Kendaraan"]) : ''}
                              {(err.field["Email"]) ? (err.field["Email"]) : ''}
                              {(err.field["Premi/bulan"]) ? (err.field["Premi/bulan"]) : ''}
                              {(err.field["Insurance Specialist"]) ? (err.field["Insurance Specialist"]) : ''}
                              {(err.field["SIM"]) ? (err.field["SIM"]) : ''}
                              {(err.field["Ahli Waris"]) ? (err.field["Ahli Waris"]) : ''}
                              {(err.field["Phone No."]) ? (err.field["Phone No."]) : ''}
                              {(err.field["No Rangka"]) ? (err.field["No Rangka"]) : ''}
                              {(err.field["No Mesin"]) ? (err.field["No Mesin"]) : ''}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          <div className={styles.desktop}>
            <div className="grid grid--center">
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Get report weekly</p>
                  {Result}
                  <div className="grid grid--center">
                    <div className="1--desk grid__cell">
                      <FormButton name="submit" value="Download" handleRoute={this.donwloadFile} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Get report to Sinarmas monthly</p>
                  <FormDropdownInput title="Bulan" name="month" firstOption="Pilih Bulan" input={dataMonth} />
                  <FormTextInput type="number" name="year" label="Tahun" minLength="2" maxLength="50" typeInput="general" />
                  {ResultTMI}
                  <div className="grid grid--center">
                    <div className="1--desk grid__cell">
                      <FormButton name="submit" value="Download" handleRoute={this.donwloadFileTMI} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Invoice</p>
                  <FormDatePicker name="start_date_invoice" title="Start Date" />
                  <FormDatePicker name="end_date_invoice" title="End Date" />
                  {ResultInvoice}
                  {ResultAttachment}
                  <div className="grid grid--center">
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Invoice" handleRoute={this.donwloadFileInvoice} />
                    </div>
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Lampiran" handleRoute={this.donwloadFileAttachment} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Junk</p>
                  <FormDatePicker name="start_date_junk" title="Start Date" />
                  <FormDatePicker name="end_date_junk" title="End Date" />
                  {ResultJunk}
                  {ResultAllJunk}
                  <div className="grid grid--center">
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Donwload" handleRoute={this.donwloadFileJunk} />
                    </div>
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Dwnld All" handleRoute={this.donwloadFileAllJunk} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (localStorage.getItem('role') === 'UPLOADER') {
      resutAuth = (
        <div>
          <div className={styles.loginInfo}>Selamat Datang {localStorage.getItem('user')}</div>
          <div className={styles.containerUpload}>
            <div className="grid grid--center">
              <div className="1/2--desk grid__cell">
                <div className={styles.title}>Upload Daily</div>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} accept=".csv" className={styles.boxFile}>
                    {resultLoading}
                </Dropzone>
              </div>
              <div className="1/2--desk grid__cell">
                <div className={styles.title}>Upload Cleansing & Bill</div>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDropCleansing} accept=".csv" className={styles.boxFile}>
                    {resultLoadingBill}
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (localStorage.getItem('role') === 'DOWNLOADER') {
      resutAuth = (
        <div>
          <div className={styles.loginInfo}>Selamat Datang {localStorage.getItem('user')}</div>
          <div className={styles.desktop}>
            <div className="grid grid--center">
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Get report weekly</p>
                  {Result}
                  <div className="grid grid--center">
                    <div className="1--desk grid__cell">
                      <FormButton name="submit" value="Download" handleRoute={this.donwloadFile} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Get report to TMI monthly</p>
                  <FormDropdownInput title="Bulan" name="month" firstOption="Pilih Bulan" input={dataMonth} />
                  <FormTextInput type="number" name="year" label="Tahun" minLength="2" maxLength="50" typeInput="general" />
                  {ResultTMI}
                  <div className="grid grid--center">
                    <div className="1--desk grid__cell">
                      <FormButton name="submit" value="Download" handleRoute={this.donwloadFileTMI} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Invoice</p>
                  <FormDatePicker name="start_date_invoice" title="Start Date" />
                  <FormDatePicker name="end_date_invoice" title="End Date" />
                  {ResultInvoice}
                  {ResultAttachment}
                  <div className="grid grid--center">
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Invoice" handleRoute={this.donwloadFileInvoice} />
                    </div>
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Lampiran" handleRoute={this.donwloadFileAttachment} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/4--desk grid__cell">
                <div className={styles.containerDownload}>
                  <p className={styles.title}>Junk</p>
                  <FormDatePicker name="start_date_junk" title="Start Date" />
                  <FormDatePicker name="end_date_junk" title="End Date" />
                  {ResultJunk}
                  {ResultAllJunk}
                  <div className="grid grid--center">
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Donwload" handleRoute={this.donwloadFileJunk} />
                    </div>
                    <div className="1/2--desk grid__cell">
                      <FormButton name="submit" value="Dwnld All" handleRoute={this.donwloadFileAllJunk} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      resutAuth = (
        <div className={styles.loginInfo}>Silahkan Login Terlebih Dahulu, <span className={styles.logout} onClick={this.login}>Login</span></div>
      );
    }
    return (
      <div className={styles.simpleHomePage}>
        {resutAuth}
      </div>
    );
  }
}

const errorStyle = {
  color: 'red'
}

const successStyle = {
  color: 'green'
}

const mapStateToProps = createStructuredSelector({
  data              : selectData(),
  loading           : selectLoading(),
  error             : selectError(),
  status            : selectStatus(),
  dataTMI           : selectDataTMI(),
  loadingTMI        : selectLoadingTMI(),
  errorTMI          : selectErrorTMI(),
  statusTMI         : selectStatusTMI(),
  dataInvoice       : selectDataInvoice(),
  loadingInvoice    : selectLoadingInvoice(),
  errorInvoice      : selectErrorInvoice(),
  statusInvoice     : selectStatusInvoice(),
  dataAttachment    : selectDataAttachment(),
  loadingAttachment : selectLoadingAttachment(),
  errorAttachment   : selectErrorAttachment(),
  statusAttachment  : selectStatusAttachment(),
  dataJunk          : selectDataJunk(),
  loadingJunk       : selectLoadingJunk(),
  errorJunk         : selectErrorJunk(),
  statusJunk        : selectStatusJunk(),
  dataAllJunk       : selectDataAllJunk(),
  loadingAllJunk    : selectLoadingAllJunk(),
  errorAllJunk      : selectErrorAllJunk(),
  statusAllJunk     : selectStatusAllJunk(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute               : (url) => dispatch(push(url)),
    fetchDataRequest          : () => dispatch(fetchDataRequest()),
    fetchDataRequestTMI       : () => dispatch(fetchDataRequestTMI()),
    fetchDataRequestInvoice   : () => dispatch(fetchDataRequestInvoice()),
    fetchDataRequestAttachment: () => dispatch(fetchDataRequestAttachment()),
    fetchDataRequestJunk      : () => dispatch(fetchDataRequestJunk()),
    fetchDataRequestAllJunk   : () => dispatch(fetchDataRequestAllJunk()),
    dispatch,
  };
}

SimpleHomePage.propTypes = {
  changeRoute     : React.PropTypes.func,
  fetchDataRequest: React.PropTypes.func,
  loading         : PropTypes.bool,
  error           : PropTypes.bool,
  status          : PropTypes.string,
  data: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchDataRequestTMI : React.PropTypes.func,
  loadingTMI          : PropTypes.bool,
  errorTMI            : PropTypes.bool,
  statusTMI           : PropTypes.string,
  dataTMI: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchDataRequestInvoice : React.PropTypes.func,
  loadingInvoice          : PropTypes.bool,
  errorInvoice            : PropTypes.bool,
  statusInvoice           : PropTypes.string,
  dataInvoice: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchDataRequestAttachment: React.PropTypes.func,
  loadingAttachment         : PropTypes.bool,
  errorAttachment           : PropTypes.bool,
  statusAttachment          : PropTypes.string,
  dataAttachment: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchDataRequestJunk : React.PropTypes.func,
  loadingJunk          : PropTypes.bool,
  errorJunk            : PropTypes.bool,
  statusJunk           : PropTypes.string,
  dataJunk: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchDataRequestAllJunk: React.PropTypes.func,
  loadingAllJunk         : PropTypes.bool,
  errorAllJunk           : PropTypes.bool,
  statusAllJunk          : PropTypes.string,
  dataAllJunk: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default connect( mapStateToProps, mapDispatchToProps )( SimpleHomePage );
