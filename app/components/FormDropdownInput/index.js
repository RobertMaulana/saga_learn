/**
*
* FormDropdownInput
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';
import arrowDown from './images/arrow-down.png';
import classNames from 'classnames/bind';

class FormDropdownInput extends React.Component {

  constructor(props) {
    let storedValue = localStorage.getItem(props.name);
    super(props);
    this.handleChange = this.handleChange.bind(this);
    if (!storedValue) {
      storedValue = props.firstOption;
      localStorage.setItem(this.props.name, storedValue);
    }
    this.state = {
      value: storedValue,
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem(this.props.name, e.target.value);
  }

  render() {
    const { input, platform } = this.props;
    const values = input.map((data, i) =>
      <option key={i} value={data[0]} className={styles.valueText}>{data[1]}</option>
    );
    const cx = classNames.bind(styles);
    let containerDropdown;
    if (platform === 'desktop') {
      containerDropdown = cx(styles.containerDropdown, styles.containerDropdownDesk);
    } else {
      containerDropdown = cx(styles.containerDropdown);
    }
    return (
      <div className={containerDropdown}>
        <div className={styles.boxTitle}>{this.props.title}<span className={styles.subtitle}>{this.props.label}</span></div>
        <select name={this.props.name} className={styles.formControl} onChange={this.handleChange} defaultValue={this.state.value}>
          <option value={this.props.firstOption} disabled="disabled">{this.props.firstOption}</option>
          {values}
        </select>
        <div className={styles.containerArrowDown}>
          <img src={arrowDown} alt={arrowDown} />
        </div>
      </div>
    );
  }
}

FormDropdownInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  firstOption: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.array.isRequired,
  platform: PropTypes.string,
};

export default FormDropdownInput;
