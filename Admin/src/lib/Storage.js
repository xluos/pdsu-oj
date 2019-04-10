export const PDSUOJ_USER = '__PDSUOJ_USER__'


export function setUserInfo(user) {
  if (typeof user !== 'string') {
    user = JSON.stringify(user)
  }
  return sessionStorage.setItem(PDSUOJ_USER, user)
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(PDSUOJ_USER))
}
