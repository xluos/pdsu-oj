import axios from 'axios';
import Cookies from 'js-cookie'

if (window) {
  console.log('window');
  window.ccc = Cookies
}

const BASEURL = '/ojapi';
const TIMEOUT = 8000;
const TOKEN_KEY = 'pdoj_token'

const localOptions = {
  baseURL: 'http://127.0.0.1:7001/',
  withCredentials: true
}

let options = {
  baseURL: BASEURL,
  timeout: TIMEOUT,
  maxRedirects: 0 // 不允许重定向
}

Object.assign

const Api = axios.create(Object.assign(options, localOptions));

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