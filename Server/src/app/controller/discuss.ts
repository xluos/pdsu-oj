import { controller, post, provide } from 'midway';
import { Discuss } from '../../model/generated/prisma-client';
import { prisma } from "../../model";
import { parseArgs } from '../../lib/utils';
import _ = require('lodash');
import { ILimit } from '../../interface';

@provide()
@controller('/discuss')
export class DiscussController {

  @post('/list')
  async getSubmit(ctx): Promise<void> {
    const options: ILimit = ctx._body;
    ctx.validate({
      pageNo: 'number?',
      pageSize: 'number?',
      where: 'object?',
      sort: 'string?',
    }, options);

    let where = options.where || {}
    
    const andParams = [{
      type: 'problemId',
      value: val => ({ problemId: val }),
    }]
    const orParams = []
    
    // 整理所有AND条件
    let AND = []
    for (const it of andParams) {
      if(_.has(where, it.type) && where[it.type]) {
        AND.push(it.value(where[it.type]))
      }
    }
    AND = _.flatten(AND)    

    // 整理所有OR条件
    let OR = []
    for (const it of orParams) {
      if(_.has(where, it.type) && where[it.type]) {
        OR.push(it.value(where[it.type]))
      }
    }
    OR = _.flatten(OR)

    // 整合where
    OR.length && AND.push({OR})
    where = {
      where: {
        AND
      }
    }

    let sort = options.sort ? {
      orderBy: options.sort
    } : {}
    
    let count = await prisma.discussesConnection(where).aggregate().count()
    // 规范参数    
    let { 
      pageSize, 
      pageEnd, 
      pageNo } = parseArgs(options, count)
    
    let args = Object.assign({
      skip: (pageNo - 1) * pageSize,
      first: pageSize
    }, where, sort )

    let discusses: Discuss[] 
    
    if (where.mini) {
      discusses = await prisma.discusses(args)
    } else {
      discusses = await prisma.discusses(args)
    }
    ctx.body = {
      pageNo ,
      pageSize ,
      pageEnd ,
      total: count,
      items: discusses
    }
  }
  @post('/create')
  async createSubmit(ctx): Promise<void> {
    const options = ctx._body;
    ctx.validate({
      content: 'string',
    }, options);

    const discusses: Discuss = await prisma.createDiscuss({
      problemId: options.problemId,
      content: options.content,
      contentRaw: options.content,
      userId: options.userId,
      userName: options.userName,
      user: {
        connect: {
          userId: options.userId
        }
      }
    })

    ctx.body = {
      items: discusses
    }
  }
}
