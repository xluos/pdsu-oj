// 记录主要几大类型

/**
 * 用户接口
 * 
 * @description 记录用户所有属性
 * @export
 * @interface IUser
 */
export interface IUser {
  status?: number
  photo?: string
  desc?: string
  integral?: number
  coin?: number
  id?: string
  userId?: string 
  password?: string
  level?: number 
  name?: string 
  email?: string
  privilegeGroup?: IPrivilegeGroup[]
  UserDiscuss?: IDiscuss[] 
  UserDiscussChilder?: IDiscussChilder[] 
  userGroup?: {id: string}[] | {id: string} 
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
  count: number;
  name: string
  id?: string
  createUserUUID: string,
  createUserName: string,
  createUserId: string,
  privilegeUserUUID: string[],
  usersUUID: string[],
}

// 题目
export interface IProblem {
  id?: string
  integral?: number
  limitTime: number
  limitMemory: number
  sourceId?: string
  createUserId?: string
  status?: number 
  type?: number 
  tags: object
  title: string
  describe: string
  inDescribe: string
  outDescribe: string
  inExample: string
  outExample: string
  hint?: string
  source?: string
  example?: string
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
  id?: string,
  contestTime: string[],
  hint?: string,
  name: string
  type: number
  createUserName: string
  createUserId: string
  firstStartTime: string
  startTime: string
  endTime: string
  userGroup: string[]
  contestProblem: string[] 
}

export interface IContestProblem {
  problem?: IProblem
  problemId?: string
  problemTitle?: string
  ac?: number 
  wa?: number 
}

export interface IFileService {
  insertPdsuOjData: (data: string, createUserName?: string, createUserId?: string ) => Promise<number>,
  insertHustOjData: (data: string, createUserName?: string, createUserId?: string ) => Promise<number>,
}

export interface ILimit {
  pageNo: number,
  pageSize: number,
  where: any,
  sort?: string,
  groupId?: string,
}