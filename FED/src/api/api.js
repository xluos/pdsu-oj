import axios from 'axios';
import Cookies from 'js-cookie';
import { serviceHost } from '../../config';

const BASEURL = serviceHost;
const TIMEOUT = 8000;
const TOKEN_KEY = 'pdoj_token'

let options = {
  baseURL: BASEURL,
  timeout: TIMEOUT,
  maxRedirects: 0, // 不允许重定向
  withCredentials: true,
}

const Api = axios.create(options);

Api.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Object.assign(config.headers, {
    Authorization: `Bearer ${Cookies.get(TOKEN_KEY) || ''}`
  })
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default Api;
