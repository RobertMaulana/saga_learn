/* @flow weak */

import request from 'superagent';
import APIBase from '../../internals/api-base';

export default (mocked = false, data, callback = () => {}) => {
  if (mocked) {
    const time = [600, 1500, 200, 2000, 1499, 700, 1000, 500, 900];
    const rand = time[Math.floor(Math.random() * time.length)];
    const randomResponse = [0, 1][Math.floor(Math.random() * 2)];
    setTimeout(function () {
      if (randomResponse) {
        return callback({
      		SourceID          : "20160906PASARPOLIS",
      		NoRef             : "1234",
      		ErrorCode         : "0",
      		ErrorMessage      : "",
      		PolicyInsuranceNo : "P2160000000001",
      		IssueDate         : "01/25/2016"
        })
      }
      return callback({
        SourceID          : "20160906PASARPOLIS",
        NoRef             : "1234",
        ErrorCode         : "1",
        ErrorMessage      : "DATA_EXIST",
        PolicyInsuranceNo : "",
        IssueDate         : ""
      })
    }, rand);
  } else {
    request
      .post(`${APIBase}/api/v2/goproteksi-simpel/simasnet-api`)
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const response = JSON.parse(res.text);
        callback({ err, response });
      })
  }
}
