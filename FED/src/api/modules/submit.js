import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 提交题目答案
 *
 * @export
 * @param {*} params 账号密码
 * @returns 用户信息
 */
export function upProblem(params) {
  return api.post('/submit/upProblem', params).then(response => {
    return get(response, 'data', {})
  })
}
