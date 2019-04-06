import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 登陆接口
 *
 * @export
 * @param {*} params 账号密码
 * @returns 用户信息
 */
export function login(params) {
  return api.post('/login', params).then(response => {
    return get(response, 'data', {})
  })
}

/**
 * 注册接口
 *
 * @export
 * @param {*} params 用户数据
 * @returns
 */
export function signup (params) {
  return api.post('/signup', params).then(response => {
    return get(response, 'data', {})
  })
}

/**
 * 测试登陆状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export function testlogin (params) {
  return api.get('/testlogin', params).then(response => {
    return get(response, 'data', {})
  })
}
export function gettoken (params) {
  return api.get('/gettoken', params).then(response => {
    return get(response, 'data', {})
  })
}