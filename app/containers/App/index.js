/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// import Img from 'components/Img';
// import Banner from './banner-metal.jpg';
// import A from 'components/A';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      {props.children}
      <AppFooter />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
