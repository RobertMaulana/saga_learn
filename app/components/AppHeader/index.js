import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { Link } from 'react-router';
// import Radium from 'radium';

import Logo from './images/logo.png';
// import MenuIcon from './images/burger-menu.png';
import Phone from './images/phone.png';

import styles from './styles.css';

// const RadiumLink = new Radium(Link);

export class AppHeader extends React.Component {

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openDashboard = () => {
    window.location.reload(true);
    this.openRoute('/dashboard');
  }

  openGoride = () => {
    window.location.reload(true);
    this.openRoute('/goride/home');
  }

  openSimple = () => {
    window.location.reload(true);
    this.openRoute('/simpel/home');
  }

  openComplete = () => {
    window.location.reload(true);
    this.openRoute('/komplit/home');
  }

  openStatus = () => {
    window.location.reload(true);
    this.openRoute('/status');
  }

  logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('passwordShouldMinimize');
    localStorage.removeItem('usernameShouldMinimize');
    window.location.reload(true);
    this.openRoute('/');
  }

  render() {
    return (
      <div className={styles.fixed}>
        <div className={styles.desktop}>
          <div className={styles.navWhite}>
            <div className={styles.container}>
              <div className={styles.contentRight}>
                <div className={styles.callCenter}>
                  <img src={Phone} alt="Phone" />
                </div>
                <span><a href="tel:(021) 3044 8080">(021) 3044 8080</a>&nbsp;<span className={styles.timeText}>Senin - Jumat 08:00-20:00</span></span>
              </div>
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.container}>
              <img className={styles.pplogo} src={Logo} alt="Pasarpolis Logo" onClick={this.openDashboard} />
              {localStorage.getItem('role') !== null ? <ul>
                <li><span onClick={this.openGoride}>Goride</span></li>
                <li><span onClick={this.openSimple}>Simpel</span></li>
                <li><span onClick={this.openComplete}>Komplit</span></li>
                <li><span onClick={this.openStatus}>File Status</span></li>
                <li><span onClick={this.logout}>Logout</span></li>
              </ul> : ''}
            </div>
          </div>
        </div>
        <div className={styles.mobile}>
          <div className={styles.header}>
            <img className={styles.pplogo} src={Logo} alt="Pasarpolis Logo" />
            <span className={styles.pptext}><a href="tel:(021) 3044 8080">(021) 3044 8080</a><br /><font className={styles.timetext}>08:00-20:00 WIB</font></span>
            <div className={styles.callCenter}>
              <img src={Phone} alt="Phone" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

AppHeader.propTypes = {
  changeRoute: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AppHeader);
