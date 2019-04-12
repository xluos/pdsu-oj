import api from '../api';
import _ from 'lodash';

/**
 * 创建或设置用户信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function setUserInfo(params) {
  return api.post('/user/info', params).then(response => {
    return _.get(response, 'data', {})
  })
}

/**
 * 创建或设置用户信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function getUserInfo(id) {
  return api.get(`/user/info/${id}`).then(response => {
    return _.get(response, 'data', {})
  })
}

/**
 * 创建用户组信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function createUserGroup(params) {
  return api.post('/user/user-group', params).then(response => {
    return _.get(response, 'data', {})
  })
}

/**
 * 删除用户组用户
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function deleteUserGroupUser(params) {
  return api.delete('/user/user-group', params).then(response => {
    return _.get(response, 'data', {})
  })
}
