export const PDSUOJ_USER = '__PDSUOJ_USER__'


export function setUserInfo(user) {
  return sessionStorage.setItem(PDSUOJ_USER, JSON.stringify(user))
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(PDSUOJ_USER))
}