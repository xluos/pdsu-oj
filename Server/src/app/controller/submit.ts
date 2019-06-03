import { controller, post, provide } from 'midway';
import { Problem, Submit } from '../../model/generated/prisma-client';
import { prisma } from "../../model";
import { OJ_RUN } from '../../lib/OJ_STATUS';
import { parseArgs } from '../../lib/utils';
import _ = require('lodash');
import { ILimit } from '../../interface';
import { SUBMIT_INFO } from '../../lib/fragment';

const judgeHost = process.env.JUDGE_HOST || 'http://localhost:7767'

@provide()
@controller('/submit')
export class SubmitController {

  @post('/upProblem')
  async upProblem(ctx): Promise<void> {
    const options = ctx._body;
    ctx.validate({
      pid: 'string',
      type: 'number',
      userInfo: 'object',
      value: 'string'
    }, options);
    
    const problem: Problem = await prisma.problem({id:options.pid})

    let submit: Submit = await prisma.createSubmit({
      userId: options.userInfo.userId,
      userName: options.userInfo.name,
      problem: {
        connect: {
          id: options.pid
        }
      },
      problemId: problem.id,
      problemTitle: problem.title,
      language: options.type,
      code: options.value,
      result: `${OJ_RUN}`,
      limitTime: problem.limitTime,
      limitMemory: problem.limitMemory,
      time: 0,
      memory: 0
    })

    // let data = await ctx.curl('http://localhost:7767', {
    let data = await ctx.curl(judgeHost, {
      method: 'post',
      data: {
        "runId": submit.id,
        "type": 0,
        "language": options.type,
        "code": options.value,
        "problemId": problem.id,
        "limitTime": problem.limitTime,
        "limitMemory": problem.limitMemory,
        "testdata": [{
          "id": "4654646654",
          "in": problem.inExample,
          "out": problem.outExample
        }]
      },
      timeout: 8000,
      dataType: 'json',
      contentType: 'json',
    })
    submit = await this.updateProblem(data)
    ctx.body = {
      submit
    };
  }

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
      type: 'userId',
      value: val => ({ userId: val }),
    }, {
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
    
    let count = await prisma.submitsConnection(where).aggregate().count()
    // 规范参数    
    let { 
      pageSize, 
      pageEnd, 
      pageNo } = parseArgs(options, count)
    
    let args = Object.assign({
      skip: (pageNo - 1) * pageSize,
      first: pageSize
    }, where, sort )

    let submits: Submit[] 
    
    if (where.mini) {
      submits = await prisma.submits(args).$fragment(SUBMIT_INFO)
    } else {
      submits = await prisma.submits(args).$fragment(SUBMIT_INFO)
    }
    ctx.body = {
      pageNo ,
      pageSize ,
      pageEnd ,
      total: count,
      items: submits
    }
  }

  async updateProblem({data}): Promise<Submit> {
    let Submit = await prisma.updateSubmit({
      data: {
        result: `${data.code}`,
        errorInfo: data.error,
        time: data.time,
        memory: data.memory,
      },
      where: {
        id: data.runId
      }
    })
    console.log(Submit);
    return Submit
  }
  
}
