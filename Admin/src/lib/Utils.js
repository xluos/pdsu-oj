import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';
import { setUserInfo, PDSUOJ_USER } from "./Storage";

// 工具函数
export function get(object, path, defaultValue) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
          .reduce((o, k) => (o || {})[k], object) || defaultValue;
}

export function mixin(Obj, newObj) {
  if (!newObj) return Obj;
  for (const key in Obj) {
    if (Obj.hasOwnProperty(key)) {
      const item = newObj[key];
      item && (Obj[key] = item);
    }
  }
  return Obj
}

// 验证登录状态

export function verifyLoginStatus () {
  let token = Cookies.get('pdoj_token')
  if (token) {
    try {
      let userInfo = Base64.decode(token.split('.')[1])
      if(!sessionStorage.getItem(PDSUOJ_USER)) {
        setUserInfo(userInfo)
      }
    } catch (error) {
      console.error(error.message)
    }
    return true
  } else {
    return false
  }
}

// 取消登录状态

export function clearLoginStatus() {
  Cookies.remove('pdoj_token')
  sessionStorage.removeItem(PDSUOJ_USER)
}
