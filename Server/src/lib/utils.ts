import md5 = require("crypto-js/md5");

const key = ')(*&^'

export function handlePassword(params:string) {
  return md5(params + key)
}

export const excludePassword  = ({password='', ...rest}) => rest;