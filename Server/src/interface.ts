// 记录主要几大类型

/**
 * 用户接口
 * 
 * @description 记录用户所有属性
 * @export
 * @interface IUser
 */
export interface IUser {
  userId?: string 
  password?: string
  level?: number 
  name?: string 
  email?: string
  privilegeGroup?: IPrivilegeGroup[]
  UserDiscuss?: IDiscuss[] 
  UserDiscussChilder?: IDiscussChilder[] 
  userGroup?: IUserGroup[] 
  createUserGroup?: IUserGroup[] 
  privilegeUserGroup?: IUserGroup[] 
  submit?: number 
  solved?: number 
  accepted?: number 
}

export interface IPrivilegeGroup {
  name?: string
  privilege?: number
  users?: IUser[]
}

// 用户组
export interface IUserGroup {
  name?: string
  createUser?: IUser 
  privilege?: IUser[] 
  users?: IUser[] 
}

// 题目
export interface IProblem {
  status?: number 
  type?: number 
  tags?: object
  title?: string
  describe?: string
  inDescribe?: string
  outDescribe?: string
  inExample?: string
  outExample?: string
  hint?: string
  source?: string
  example?: string
  discuss?: IDiscuss[] 
}

// 讨论
export interface IDiscuss {
  contentRaw?: string
  content?: string
  user?: IUser 
  userId?: number
  userName?: string
  // 评论回复 楼中楼形式
  children?: IDiscussChilder[] 
}

export interface IDiscussChilder {
  contentRaw?: string
  content?: string
  user?: IUser 
  userId?: number
  userName?: string
  replyUserId?: number
  replyUserName?: string
}

export interface ISubmit {
  user?: IUser
  userId?: number
  userName?: string
  problem?: IProblem
  problemId?: string
  problemTitle?: string
  language?: number
  code?: string
  result?: string
  errorInfo?: string
  contest?: IContest 
  limitTime?: number
  limitMemory?: number
}

export interface IContest {
  name?: string
  type?: number
  createUserName?: string
  createUserId?: number
  startTime?: string
  endTime?: string
  userGroup?: IUserGroup
  contestProblem?: IContestProblem 
}

export interface IContestProblem {
  problem?: IProblem
  problemId?: string
  problemTitle?: string
  ac?: number 
  wa?: number 
}