import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 创建或设置用户信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function setProblem(params) {
  return api.post('/problem/replace', params).then(response => {
    return get(response, 'data', {})
  })
}


