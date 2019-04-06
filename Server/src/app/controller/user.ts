import { controller, post, inject, provide, put, get } from 'midway';
import { IUser, IUserGroup } from '../../interface';
import { prisma, UserGroupCreateInput, UserGroup, UserWhereUniqueInput } from '../../model/generated/prisma-client';
import { handlePassword } from "../../lib/utils";
import { USER_INFO } from '../../lib/fragment';
@provide()
@controller('/user')
export class UserController {
  @inject('userService')
  service;

  @post('/list')
  async loginUser(ctx): Promise<void> {
    // const options: IUser = ctx._body;
    // ctx.validate({
    //   userId: { type: 'string', min: 9, max: 9 },
    //   password: { type: 'password', min: 8, max: 16}
    // }, options);
    let users: IUser[] = await prisma.users().$fragment(USER_INFO);
    ctx.body = {
      items: users
    }
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

  @get('/user-group/:id')
  async UserGroup(ctx): Promise<void> {
    const id: string = ctx.params.id;

    
    if (id === 'all') {
      let userGroups: UserGroup[] = await prisma.userGroups()
      ctx.body = { items: userGroups }
    } else {
      let userGroups: UserGroup = await prisma.userGroup({id}).$fragment(`
        {
          id
          name
          createUser {
            id
            name
            userId
            desc
            email
            submit
            solved
            accepted
          }
          privilege {
            id
            name
            userId
            desc
            email
            submit
            solved
            accepted
          }
          users {
            id
            name
            userId
            desc
            email
            submit
            solved
            accepted
          }
        }
      `)
      ctx.body = userGroups
    }
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
}