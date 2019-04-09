import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 创建或设置题目信息
 *
 * @export
 * @param {*} params 题目信息
 * @returns
 */
export function setProblem(params) {
  return api.post('/problem/replace', params).then(response => {
    return get(response, 'data', {})
  })
}

/**
 * 获取题目信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getProblemList(params) {
  return api.post('/problem/list', params).then(response => {
    return get(response, 'data', {})
  })
}


