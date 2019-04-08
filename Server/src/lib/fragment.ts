export const USER_INFO = '{accepted,coin,createdAt,defaultUserGroup,defaultUserGroupId,desc,email,id,integral,level,name,photo,privilegeBlack,privilegeWhite,problems,solved,status,submit,updatedAt,userId}'
export const USER_GROUP_INFO = `
{
  id
  name
  desc
  createdAt
  createUser ${USER_INFO}
  privilege ${USER_INFO}
  users ${USER_INFO}
  applyUsers ${USER_INFO}
}
`
export const USER_GROUP_INFO_MINI = `
{
  id
  name
  desc
  createdAt
}
`