import api from '../api';
import _ from 'lodash';

/**
 * 创建或设置题目信息
 *
 * @export
 * @param {*} params 题目信息
 * @returns
 */
export function setDiscusses(params) {
  return api.post('/discuss/create', params).then(response => {
    return _.get(response, 'data', {})
  })
}



