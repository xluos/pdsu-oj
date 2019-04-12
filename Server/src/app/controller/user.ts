import { controller, post, inject, provide, put, del, get } from 'midway';
import { IUser, IUserGroup, ILimit } from '../../interface';
import { prisma, UserGroupCreateInput, UserGroup, UserWhereUniqueInput, User } from '../../model/generated/prisma-client';
import { handlePassword, parseArgs } from "../../lib/utils";
import { USER_INFO, USER_GROUP_INFO, USER_GROUP_INFO_MINI, USER_INFO_MINI } from '../../lib/fragment';
import _ = require('lodash');
@provide()
@controller('/user')
export class UserController {
  @inject('userService')
  service;

  @post('/list')
  async getUserList(ctx): Promise<void> {
    const options: ILimit = ctx._body;
    ctx.validate({
      pageNo: 'number?',
      pageSize: 'number?',
      where: 'object?',
      sort: 'string?',
    }, options);

    let where = options.where || {}
    
    const andParams = [{
      type: 'status',
      value: val => ({ status: val }),
    }, {
      type: 'level',
      value: val => ({ level: val - 1 }),
    }]
    const orParams = [{
      type: 'text',
      value: val => ([
        {userId_contains: val},
        {name_contains: val},
        {desc_contains: val},
      ]),
    }]
    
    // 整理所有AND条件
    let AND = []
    for (const it of andParams) {
      if(_.has(where, it.type) && where[it.type]) {
        AND.push(it.value(where[it.type]))
      }
    }
    AND = _.flatten(AND)

    console.log(AND);
    

    // 整理所有OR条件
    let OR = []
    for (const it of orParams) {
      if(_.has(where, it.type) && where[it.type]) {
        OR.push(it.value(where[it.type]))
      }
    }
    OR = _.flatten(OR)

    console.log(OR);

    // 整合where

    OR.length && AND.push({OR})

    where = {
      where: {
        AND
      }
    }

    console.log(where);


    let sort = options.sort ? {
      orderBy: options.sort
    } : {}
    
    let count = await prisma.usersConnection(where).aggregate().count()
    // 规范参数    
    let { 
      pageSize, 
      pageEnd, 
      pageNo } = parseArgs(options, count)
    
    console.log('skip', (pageNo - 1) * pageSize, (pageNo - 1) , pageSize);
    
    let args = Object.assign({
      skip: (pageNo - 1) * pageSize,
      first: pageSize
    }, where, sort )

    let problems: User[] 
    
    if (where.mini) {
      problems = await prisma.users(args).$fragment(USER_INFO_MINI)
    } else {
      problems = await prisma.users(args).$fragment(USER_INFO)
    }
    ctx.body = {
      pageNo ,
      pageSize ,
      pageEnd ,
      total: count,
      items: problems
    }
  }

  @get('/info/:id')
  async getUserInfo(ctx): Promise<void> {
    const { id } = ctx.params;

    let user = await prisma.user({id}).$fragment(USER_INFO)

    ctx.body = {
      user
    };

  }

  @post('/info')
  async updateUser(ctx): Promise<void> {
    const options: IUser = ctx._body;
    ctx.validate(Object.assign({
      id: 'string?',
      name: 'string',
      userId: /^\d{9}$/,
      photo: {type: 'url', required: false, allowEmpty: true},
      submit: { type: 'integer?', min: 0 },
      solved: { type: 'integer?', min: 0 },
      accepted: { type: 'integer?', min: 0 },
      coin: { type: 'integer?', min: 0 },
      integral: { type: 'integer?', min: 0 },
      level: { type: 'integer?', min: 0, max: 6 },
      email: {type: 'email', required: false, allowEmpty: true},
      desc: 'string?',
      userGroup: 'string?',
      status: 'integer?',
    }, options.password ? {
      password: { type: 'password', min: 8, max: 16, compare: 'repassword'},
    } : {}), options);

    const args = {
      userId: options.userId,
      password: handlePassword(options.password),
      status: options.status,
      level: options.level,
      name: options.name,
      photo: options.photo,
      email: options.email,
      desc: options.desc,
      integral: options.integral,
      coin: options.coin,
      userGroup: {
        connect: options.userGroup
      },
      submit: options.submit,
      solved: options.solved,
      accepted: options.accepted,
    }

    let user: IUser;
    // 有ID更新  无Id创建
    if (!options.id) {
      user = await prisma.createUser(args)
      .$fragment(USER_INFO)
    } else {
      user = await prisma.updateUser({
        data: args,
        where: {
          id: options.id
        }
      }).$fragment(USER_INFO)
    }
    ctx.body = user;

  }

  @post('/user-group/list')
  async UserGroup(ctx): Promise<void> {
    const { id, mini } = ctx._body;

    ctx.validate({
      id: 'string',
      mini: 'boolean'
    }, ctx._body)

    if (id === 'all') {
      let userGroups: UserGroup[] = await prisma.userGroups()
      ctx.body = { items: userGroups }
    } else {
      let userGroups: UserGroup = await prisma.userGroup({id}).$fragment(mini ? USER_GROUP_INFO_MINI : USER_GROUP_INFO)
      ctx.body = userGroups
    }
  }
  
  @post('/user-group/search')
  async searchUserGroup(ctx): Promise<void> {
    const name: string = ctx._body.name;

    ctx.validate({
      name: 'string?'
    }, ctx._body)
  
    let userGroups: UserGroup[] = await prisma.userGroups({
      where: {
        OR: [
          {name_contains: name},
          {desc_contains: name},
          {createUserName_contains: name},
        ],
      }
    })
    ctx.body = { items: userGroups }
    
  }

  @post('/user-group')
  async createUserGroup(ctx): Promise<void> {
    const options: IUserGroup = ctx._body;
    ctx.validate({
      id: 'string?',
      name: 'string',
      desc: 'string?',
      createUserUUID: 'string',
      createUserId: /\d{9}/,
      createUserName: 'string',
    }, options);

    const args: UserGroupCreateInput = {
      name: options.name,
      createUserId: options.createUserId,
      createUserName: options.createUserName,
      createUser: {
        connect: {
          id: options.createUserUUID
        }
      },
      privilege: {
        connect: {
          id: options.createUserUUID
        }
      },
      users: {
        connect: {
          id: options.createUserUUID
        }
      },
    }

    let user: UserGroup;
    // 有ID更新  无Id创建
    if (!options.id) {
      user = await prisma.createUserGroup(args)
    } 
    ctx.body = user;

  }

  @put('/user-group')
  async updateUserGroup(ctx): Promise<void> {
    const options: IUserGroup = ctx._body;
    ctx.validate({
      id: 'string',
      count: 'integer',
      privilegeUserUUID: { type: 'array', itemType: 'string' },
      usersUUID: { type: 'array', itemType: 'string' },
    }, options);

    const args = {
      data: {
        count: options.count,
        privilege: {
          connect: options.privilegeUserUUID.map((id: string): UserWhereUniqueInput => {return {id}})
        },
        users: {
          connect: options.usersUUID.map((id: string): UserWhereUniqueInput => {return {id}})
        }
      },
      where: {
        id: options.id
      }
    }

    let user: UserGroup;
   
    user = await prisma.updateUserGroup(args) 
    
    ctx.body = user;

  }

  @del('/user-group')
  async delUserGroup(ctx): Promise<void> {
    const options: IUserGroup = ctx._body;
    ctx.validate({
      id: 'string',
      count: 'integer',
      userUUID: { type: 'array', itemType: 'string' },
    }, options);

    const args = {
      data: {
        count: options.count,
        privilege: {
          delete: options.usersUUID.map((id: string): UserWhereUniqueInput => {return {id}})
        },
        users: {
          delete: options.usersUUID.map((id: string): UserWhereUniqueInput => {return {id}})
        }
      },
      where: {
        id: options.id
      }
    }

    let user: UserGroup;
   
    user = await prisma.updateUserGroup(args) 
    
    ctx.body = user;

  }
}
