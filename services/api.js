import axios from 'axios';
import qs from 'qs';

import ApiError from 'root/utilities/apiError';

class Api {
  apiUrl = 'https://ultrasmap-prod.nero12.usermd.net';

  getConfig = (data = null, dataType = 'query') => {
    // const jwtToken = localStorage.getItem('jwtToken');

    const config = {};

    // if (jwtToken) {
    //   Object.assign(config, {
    //     headers: {
    //       Authorization: `Bearer ${jwtToken}`,
    //     },
    //   });
    // }

    if (data) {
      if (dataType === 'query') {
        Object.assign(config, {
          paramsSerializer: params => qs.stringify(params),
          params: data,
        });
      } else {
        Object.assign(config, {
          data,
        });
      }
    }

    return config;
  }

  post = (url, body) => this.doQuery(async () => await axios.post(`${this.apiUrl}${url}`, body, this.getConfig()));

  // put = (url, body, defaultErrorHandling = true) => this.doQuery(async () => await axios.put(`${this.apiUrl}${url}`, body, this.getConfig()), defaultErrorHandling);

  // patch = (url, body, defaultErrorHandling = true) => this.doQuery(async () => await axios.patch(`${this.apiUrl}${url}`, body, this.getConfig()), defaultErrorHandling);

  // delete = (url, body, defaultErrorHandling = true) =>  this.doQuery(async () => await axios.delete(`${this.apiUrl}${url}`, this.getConfig(body, 'body')), defaultErrorHandling);

  get = (url, query = {}) => this.doQuery(async () => await axios.get(`${this.apiUrl}${url}`, this.getConfig(query, 'query')));

  doQuery = async (queryFunc) => new Promise(async (resolve) => {
    try {
      const { data } = await queryFunc();

      resolve(data);
    } catch (error) {
      new ApiError(error);
    }
  });
}

export default new Api();
