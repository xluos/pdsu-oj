import { controller, post, provide } from 'midway';
import {
  Contest, 
  UserGroupWhereUniqueInput, 
  ContestProblemWhereUniqueInput,
} from '../../model/generated/prisma-client';
import { prisma } from "../../model";
import { IContest, ILimit } from '../../interface';
import _ = require('lodash');
import { parseArgs } from '../../lib/utils';

@provide()
@controller('/contest')
export class ContestController {

  @post('/list')
  async getContestList(ctx): Promise<void> {
    const options: ILimit = ctx._body;
    ctx.validate({
      pageNo: 'number?',
      pageSize: 'number?',
      where: 'object?',
      sort: 'string?',
    }, options);

    let where = options.where || {}
    
    const andParams = []
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
    
    let count = await prisma.contestsConnection(where).aggregate().count()
    // 规范参数    
    let { 
      pageSize, 
      pageEnd, 
      pageNo } = parseArgs(options, count)
    
    let args = Object.assign({
      skip: (pageNo - 1) * pageSize,
      first: pageSize
    }, where, sort )

    let contests: Contest[] 
    
    if (where.mini) {
      contests = await prisma.contests(args)
    } else {
      contests = await prisma.contests(args)
    }
    ctx.body = {
      pageNo ,
      pageSize ,
      pageEnd ,
      total: count,
      items: contests
    }
  }

  @post('/details')
  async getContestDetails(ctx): Promise<void> {
    const options:{id: string} = ctx._body
    ctx.validate({
      id: 'string',
    }, options);
    const [ info, problemList ] = await Promise.all([
      prisma.contest(options),
      prisma.contest(options).contestProblem()
    ])
    console.log(problemList);
    
    ctx.body = {
      info,
      problemList,
      problemDetails: []
    }
  }


  /**
   * 创建或更新题目
   *
   * @param {*} ctx
   * @returns {Promise<void>}
   * @memberof ProblemController
   */
  @post('/replace')
  async replaceContest(ctx): Promise<void> {
    const options: IContest = ctx._body;
    ctx.validate({
      id: 'string?',
      name: 'string',
      type: 'number',
      contestTime: {type: 'array', itemType: 'string'},
      hint: 'string?',
      userGroup: {type: 'array', itemType: 'string'},
      contestProblem: {type: 'array', itemType: 'string'},
      createUserName: 'string',
      createUserId: 'string',
    }, options);

    const arg = {
      name: options.name,
      type: options.type,
      startTime: options.contestTime[0],
      endTime: options.contestTime[1],
      hint: options.hint,
      userGroup: {
        connect: options.userGroup.map((id:string):UserGroupWhereUniqueInput => {return {id}} )
      },
      contestProblem: {
        connect: options.userGroup.map((id:string):ContestProblemWhereUniqueInput => {return {id}})
      },
      createUserName: options.createUserName,
      createUserId: options.createUserId,
    }
    let contest: Contest
    // 创建或更新
    if (options.id) {
      contest = await prisma.updateContest({
        data: arg,
        where: {
          id: options.id
        }
      })
    } else {
      contest = await prisma.createContest({
        ...arg,
        firstStartTime: options.contestTime[0]
      })
    }
    ctx.body = {
      items: contest
    }
  }

}
