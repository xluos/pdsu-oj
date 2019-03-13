// 记录主要几大类型

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  id?: number;
}

/**
 * @description User-Service response
 */
export interface IUserResult {
  id?: number;
  username?: string;
  phone?: string;
  email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  getUser(options?: IUserOptions): Promise<IUserResult>;
}


/**
 * 用户接口
 * 
 * @description 记录用户所有属性
 * @export
 * @interface IUser
 */
export interface IUser {
  id?: string
  createdAt?: string 
  updatedAt?: string
  userId?: number 
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
  problems?: object[]
  submit?: number 
  solved?: number 
  accepted?: number 
}

export interface IPrivilegeGroup {
  id?: string  
  createdAt?: string 
  updatedAt?: string
  name?: string
  privilege?: number
  users?: IUser[]
}

// 用户组
export interface IUserGroup {
  id?: string 
  createdAt?: string
  updatedAt?: string
  name?: string
  createUser?: IUser 
  privilege?: IUser[] 
  users?: IUser[] 
}

// 题目
export interface IProblem {
  id?: string 
  createdAt?: string
  updatedAt?: string
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
  id?: string  
  createdAt?: string 
  updatedAt?: string
  contentRaw?: string
  content?: string
  user?: IUser 
  userId?: number
  userName?: string
  // 评论回复 楼中楼形式
  children?: IDiscussChilder[] 
}

export interface IDiscussChilder {
  id?: string  
  createdAt?: string 
  updatedAt?: string
  contentRaw?: string
  content?: string
  user?: IUser 
  userId?: number
  userName?: string
  replyUserId?: number
  replyUserName?: string
}

export interface ISubmit {
  id?: string  
  createdAt?: string 
  updatedAt?: string
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
  id?: string  
  createdAt?: string 
  updatedAt?: string
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
  id?: string  
  createdAt?: string 
  updatedAt?: string
  problem?: IProblem
  problemId?: string
  problemTitle?: string
  ac?: number 
  wa?: number 
}