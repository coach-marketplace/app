import axios from "axios";

/**
 * API
 */

class API {
  static init() {
    this.headers = { "Content-type": "application/json" };
    this.baseUrl = `${process.env.REACT_APP_API_URL}v1/`;
  }

  static setToken(token) {
    if (!this.headers) {
      throw new Error("No headers in API instance");
    }
    this.headers.authorization = token;
  }

  static get(endPoint, params = {}) {
    return axios({
      method: "get",
      url: `${this.baseUrl}${endPoint}`,
      headers: this.headers
    });
  }

  static post(endPoint, data = {}) {
    return axios({
      method: "post",
      url: `${this.baseUrl}${endPoint}`,
      headers: this.headers,
      data
    });
  }
}

API.init();

export default API;
