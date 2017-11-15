import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeFetchGraphRequest } from './actions';
import styles from './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class SearchBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onHandleSubmit() {
    this.props.changeFetchGraphRequest(this.state.startDate);
  }

  render() {
    return(
      <div>
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
        />
        <button onClick={() => this.onHandleSubmit()}>Submit</button>
      </div>
    );
  }

}

export default connect(null, { changeFetchGraphRequest })(SearchBar);
