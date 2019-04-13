import md5 = require("crypto-js/md5");


const key = ')(*&^'

export function handlePassword(params:string) {
  return md5(params + key).toString()
}

export const excludePassword  = ({password='', ...rest}) => rest;

export const parseArgs = (options, count) => {
  
  let pageSize = (!options.pageSize || options.pageSize < 0) ? 20 : options.pageSize
  let pageEnd = Math.ceil(count / pageSize) || 1
  let pageNo = (!options.pageNo || options.pageNo < 1) ? 1 : options.pageNo
  if (pageNo > pageEnd) { pageNo = pageEnd }
  return {
    pageSize,
    pageEnd,
    pageNo,
  }
}