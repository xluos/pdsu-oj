import api from '../api';
import _ from 'lodash';

/**
 * 创建或设置题目信息
 *
 * @export
 * @param {*} params 题目信息
 * @returns
 */
export function setProblem(params) {
  return api.post('/problem/replace', params).then(response => {
    return _.get(response, 'data', {})
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
    return _.get(response, 'data', {})
  })
}

/**
 * 批量上传题目
 *
 * @export
 * @param {*} params
 * @returns
 */
export function uploadProblemList(params) {
  let fd = new FormData()
  fd.append('type', params.type)
  fd.append('createUserName', params.createUserName)
  fd.append('createUserId', params.createUserId)
  for (const file of params.files) {
    fd.append('file', file)
  }
  return api.post('/upload/problem', fd, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    return _.get(response, 'data', {})
  })
}


