/*
 *
 * LoginPageContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  loginRequest,
  loginFailure,
} from './actions';
import { createStructuredSelector } from 'reselect';
import {
  selectLoading,
  selectError,
  selectStatus,
  selectData,
} from './selectors';

import styles from './styles.css';

import FormButton from 'components/FormButton';
import FormTextInput from 'components/FormTextInput';

export class LoginPageContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  appHomePage = () => {
    window.location.reload(true);
    this.openRoute('/dashboard');
  }

  login = () => {
    this.props.loginRequest();
  }

  render() {
    if (this.props.loading === false && this.props.status === 'success' && this.props.data !== false) {
      const res = JSON.parse(this.props.data);
      if (res.status === 0 && res.authenticated === true) {
        localStorage.setItem('role', res.role);
        localStorage.setItem('user', res.fullName);
        this.props.loginFailure();
        this.appHomePage();
      } else {
        alert('username atau password salah');
      }
      console.log(`status ${JSON.stringify(res)}`);
      // this.appHomePage();
    }
    return (
      <div className={styles.loginPageContainer}>
        <div className={styles.container}>
          <p className={styles.title}>Login</p>
          <FormTextInput type="text" name="username" label="Username" minLength="2" maxLength="50" />
          <FormTextInput type="password" name="password" label="Password" minLength="2" maxLength="50" typeInput="general" />
          <FormButton name="login" value="Login" handleRoute={this.login} />
        </div>
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
    loginRequest: () => dispatch(loginRequest()),
    loginFailure: () => dispatch(loginFailure()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

LoginPageContainer.propTypes = {
  changeRoute: React.PropTypes.func,
  loginRequest: React.PropTypes.func,
  loginFailure: React.PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  status: PropTypes.string,
  data: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
