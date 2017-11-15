import React, { PropTypes } from 'react';

import styles from './styles.css';
import classNames from 'classnames/bind';

function FormButton(props) {
  const { value, name, platform } = props;
  let container;
  const cx = classNames.bind(styles);
  if (platform === 'desktop') {
    container = cx(styles.container, styles.containerDesk);
  } else {
    container = cx(styles.container);
  }
  return (
    <div className={container}>
      <button type="button" name={name} className={styles.Button} onClick={props.handleRoute}><div className={styles.wave}></div>{value}</button>
    </div>
  );
}

FormButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleRoute: PropTypes.func,
  platform: PropTypes.string,
};

export default FormButton;
