import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 创建或设置用户信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function setUserInfo(params) {
  return api.post('/user/info', params).then(response => {
    return get(response, 'data', {})
  })
}

/**
 * 创建或设置用户信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function createUserGroup(params) {
  return api.post('/user/user-group', params).then(response => {
    return get(response, 'data', {})
  })
}