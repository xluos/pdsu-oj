import api from '../api';
import { get } from '../../lib/Utils';

/**
 * 创建或设置比赛信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function setContest(params) {
  return api.post('/contest/replace', params).then(response => {
    return get(response, 'data', {})
  })
}

/**
 * 获取比赛信息
 *
 * @export
 * @param {*} params 用户信息
 * @returns 用户信息
 */
export function getContestList(params) {
  return api.post('/contest/list', params).then(response => {
    return get(response, 'data', {})
  })
}

