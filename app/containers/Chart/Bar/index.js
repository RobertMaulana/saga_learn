import React, { Component } from 'react';
import styles from './styles.css';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class BarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width : 50,
      height: 100
    }
  }

  render() {
    const { width, height } = this.state;
    return(
      <div style={{width: '400px', background: '#fff', padding: '10px'}}>
        <Bar
          data={data}
          width
          height
        />
      </div>
    )
  }

}


export default BarChart;
