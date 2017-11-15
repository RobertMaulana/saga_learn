/**
*
* FormDatePicker
*
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

class FormDatePicker extends React.Component {

  constructor(props) {
    let storedValue = localStorage.getItem(props.name);
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    if (!storedValue) {
      const d = new Date();
      d.setTime(d.getTime() - (d.getTimezoneOffset() * 60 * 1000));
      storedValue = d.toISOString().slice(0, 10);
      localStorage.setItem(this.props.name, storedValue);
    }
    this.state = {
      value: storedValue,
      isError: false,
      errorMessage: 'Umur anda melebihi maksimal',
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    localStorage.setItem(this.props.name, e.target.value);
  }

  handleBlur(e) {
    const dateSplit = e.target.value.split('-');
    const year = dateSplit[0];
    const date = new Date();
    const yearNow = date.getFullYear();
    const age = parseInt(yearNow, 10) - parseInt(year, 10);
    if (age > '75') {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
    }
  }

  render() {
    const cx = classNames.bind(styles);
    const titleLabel = this.props.title ? <span>{this.props.title}</span> : '';
    const errorClass = cx({
      error: this.state.isError,
      notError: !this.state.isError,
    });

    const errorTextClass = cx({
      formDatePickerError: this.state.isError,
      formDatePicker: !this.state.isError,
    });

    return (
      <div className={styles.formDatePickerContainer}>
        <div className={errorTextClass}>
          {titleLabel}
          <input type="date" name={this.props.name} onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.value} />
        </div>
        <div className={errorClass}>
          <label htmlFor={this.props.name}>{this.state.errorMessage}</label>
        </div>
      </div>
    );
  }
}

FormDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default FormDatePicker;
