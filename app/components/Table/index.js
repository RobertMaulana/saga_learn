/**
*
* Table
*
*/

import React, {PropTypes} from 'react';

import styles from './styles.css';

class Table extends React.Component {
  render() {
  	const dataHeader = this.props.header.map((data, i) =>
	  <td>{data}</td>
	);

	const value = this.props.value.map((data, i) =>
	  <td key={i}>{data}</td>
	);

	const containerValue = this.props.value.map((data, i) =>
	  <tr key={i}>
		{value}
	  </tr>
	);

    return (
      <div className={styles.table}>
      	<table cellpadding="5" cellspacing="0" border="1">
          <tr className={styles.header}>
          	{dataHeader}
          </tr>
          {containerValue}
      	</table>
      </div>
    );
  }
}

Table.propTypes = {
  header: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  lengthData: PropTypes.number.isRequired,
};

export default Table;
