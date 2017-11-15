/*
 *
 * DashboardContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import selectDashboardContainer from './selectors';
import styles from './styles.css';
import ReactHighcharts from 'react-highcharts';
// import FormButton from 'components/FormButton';

import {
  fetchGraphRequest,
  fetchGraphSimpleRequest,
  fetchGraphCompleteRequest,
} from './actions';
import { createStructuredSelector } from 'reselect';

import {
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
} from './selectors';

import Search from '../Chart/Search';
import LineChart from '../Chart/Line';
import PieChart from '../Chart/Pie';
import BarChart from '../Chart/Bar';
import HorChart from '../Chart/Horizontal';

export class DashboardContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.fetchGraphRequest();
    this.props.fetchGraphSimpleRequest();
    this.props.fetchGraphCompleteRequest();

  }

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  login = () => {
    this.openRoute('/');
  }

  render() {
    // goride
    let policies;
    let registrationDate;
    let totalRegistered;
    let totalPaid;
    let totalUnpaid;
    // simple
    let policiesSimple;
    let registrationDateSimple;
    let totalRegisteredSimple;
    let totalPaidSimple;
    let totalUnpaidSimple;
    // complete
    let policiesComplete;
    let registrationDateComplete;
    let totalRegisteredComplete;
    let totalPaidComplete;
    let totalUnpaidComplete;

    // goride
    if (this.props.data !== false) {
      policies = JSON.parse(this.props.data);
      registrationDate = policies.registrationDate;
      totalRegistered = policies.totalRegistered;
      totalPaid = policies.totalPaid;
      totalUnpaid = policies.totalUnpaid;
      console.log(policies);
    }
    // simple
    if (this.props.dataSimple !== false) {
      policiesSimple = JSON.parse(this.props.dataSimple);
      registrationDateSimple = policiesSimple.registrationDate;
      totalRegisteredSimple = policiesSimple.totalRegistered;
      totalPaidSimple = policiesSimple.totalPaid;
      totalUnpaidSimple = policiesSimple.totalUnpaid;
      console.log(policiesSimple);
    }
    // complete
    if (this.props.dataComplete !== false) {
      policiesComplete = JSON.parse(this.props.data);
      registrationDateComplete = policiesComplete.registrationDate;
      totalRegisteredComplete = policiesComplete.totalRegistered;
      totalPaidComplete = policiesComplete.totalPaid;
      totalUnpaidComplete = policiesComplete.totalUnpaid;
      console.log(policiesComplete);
    }
    const config = {
      chart: {
        type: 'column',
      },
      xAxis: {
        categories: registrationDate,
      },
      yAxis: {
        title: {
          text: 'Jumlah Orang',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      title: {
        text: 'Report GP',
      },
      subtitle: {
        text: 'Bulan Januari',
      },
      series: [{
        name: 'Total Registered',
        data: totalRegistered,
      },
        {
          name: 'Total Paid',
          data: totalPaid,
        },
        {
          name: 'Total Unpaid',
          data: totalUnpaid,
        }],
    };

    const configSimple = {
      chart: {
        type: 'column',
      },
      xAxis: {
        categories: registrationDateSimple,
      },
      yAxis: {
        title: {
          text: 'Jumlah Orang',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      title: {
        text: 'Report Simpel',
      },
      subtitle: {
        text: 'Bulan Januari',
      },
      series: [{
        name: 'Total Registered',
        data: totalRegisteredSimple,
      },
        {
          name: 'Total Paid',
          data: totalPaidSimple,
        },
        {
          name: 'Total Unpaid',
          data: totalUnpaidSimple,
        }],
    };

    const configComplete = {
      chart: {
        type: 'column',
      },
      xAxis: {
        categories: registrationDateComplete,
      },
      yAxis: {
        title: {
          text: 'Jumlah Orang',
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080',
        }],
      },
      title: {
        text: 'Report Complete',
      },
      subtitle: {
        text: 'Bulan Januari',
      },
      series: [{
        name: 'Total Registered',
        data: totalRegisteredComplete,
      },
        {
          name: 'Total Paid',
          data: totalPaidComplete,
        },
        {
          name: 'Total Unpaid',
          data: totalUnpaidComplete,
        }],
    };

    let resultAuth;
    if (localStorage.getItem('role') !== null) {
      resultAuth = (
        <div className={styles.container}>
          <div className={styles.containerChart}>
            <div className="searchContainer">
              <Search />
            </div>
            <div className={styles.flexbox}>
              <HorChart className={styles.hor}/>
              <PieChart className={styles.pie}/>
              <BarChart className={styles.bar}/>
            </div>
            <div className={styles.flexboxChartHorizontal}>
              <LineChart className={styles.line}/>
            </div>
            <div className={styles.containerChart}>
              <ReactHighcharts config={config} />
            </div>
          </div>

          {/*<div className={styles.containerChart}>
            <ReactHighcharts config={configSimple} />
          </div>

          <div className={styles.containerChart}>
            <ReactHighcharts config={configComplete} />
          </div>*/}
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
      <div className={styles.dashboardContainer}>
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
  dataSimple: selectDataSimple(),
  loadingSimple: selectLoadingSimple(),
  errorSimple: selectErrorSimple(),
  statusSimple: selectStatusSimple(),
  dataComplete: selectDataComplete(),
  loadingComplete: selectLoadingComplete(),
  errorComplete: selectErrorComplete(),
  statusComplete: selectStatusComplete(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    fetchGraphRequest: () => dispatch(fetchGraphRequest()),
    fetchGraphSimpleRequest: () => dispatch(fetchGraphSimpleRequest()),
    fetchGraphCompleteRequest: () => dispatch(fetchGraphCompleteRequest()),
    dispatch,
  };
}

DashboardContainer.propTypes = {
  changeRoute: React.PropTypes.func,
  fetchGraphRequest: React.PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  status: PropTypes.string,
  data: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchGraphSimpleRequest: React.PropTypes.func,
  loadingSimple: PropTypes.bool,
  errorSimple: PropTypes.bool,
  statusSimple: PropTypes.string,
  dataSimple: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  fetchGraphCompleteRequest: React.PropTypes.func,
  loadingComplete: PropTypes.bool,
  errorComplete: PropTypes.bool,
  statusComplete: PropTypes.string,
  dataComplete: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
