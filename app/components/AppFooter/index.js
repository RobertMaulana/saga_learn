import React from 'react';
// import { Link } from 'react-router';

import Logo from './images/logo.png';

import styles from './styles.css';

function AppFooter() {
  return (
    <div>
      <div className={styles.desktop}>
        <div className={styles.footer}>
          <div className={styles.container}>
            <div className="grid">
              <div className="3/4 grid__cell">
                <img src={Logo} alt="Logo" />
                <span className={styles.pptext}>
                  PT. Pasarpolis Indonesia<br />
                  Tifa Arum Realty Building<br />
                  Lantai 5, Jalan Kuningan Barat No.26<br />
                  Jakarta Selatan<br /><br />
                  Call Center: <span className={styles.pptextBold}>(021) 3044 8080</span><br />
                  Senin-Jumat, 08:00 - 20:00 WIB<br /><br />
                  &copy; 2016 PT. Pasarpolis Indonesia.All Right Reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.footer}>
          <span className={styles.pptext}>
            <span className={styles.pptextBold}>PT. Pasarpolis Indonesia </span><br />
            Tifa Arum Realty Building<br />
            Lantai 5, Jalan Kuningan Barat No.26<br />
            Jakarta Selatan<br /><br />
            CS: <span className={styles.pptextBold}>(021) 3044 8080</span><br />
            Senin-Jumat, 08:00 - 20:00 WIB<br /><br />
            &copy; 2016 PT. Pasarpolis Indonesia.All Right Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default AppFooter;
