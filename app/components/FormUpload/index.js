/**
*
* FormUpload
*
*/

import React from 'react';
import styles from './styles.css';

class FormUpload extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const value = localStorage.getItem(this.props.name);
    this.state = {
      data_uri: value ? JSON.parse(value).data_uri : undefined,
      processing: false,
    };
  }
  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(file.type);
    reader.onload = (upload) => {
      if (!['application/vnd.ms-excel'].includes(file.type)) {
        alert('You can only upload CSV file');
        return;
      }

      const image = {
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
      };
      this.setState(image);
      // console.log(JSON.stringify(image));
      localStorage.setItem(this.props.name, JSON.stringify(image));
    };

    reader.readAsDataURL(file);
  }
  render() {
    const { label } = this.props;
    return (
      <div className={styles.formUpload}>
        <div className={styles.boxTitle}>
          <span>{label}</span>
        </div>
        <input type="file" onChange={this.handleFile(this)} name="file" accept=".csv" />
      </div>
    );
  }
}

FormUpload.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
};

export default FormUpload;
