import React, { Component } from 'react';
import styles from './styles.css';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class PieChart extends Component {

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
        <Pie
					data={data}
					width
					height
				/>
      </div>
    )
  }

}


export default PieChart;
