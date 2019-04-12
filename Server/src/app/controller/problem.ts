import { controller, post, provide, get } from 'midway';
import { prisma, Problem, ProblemCreateInput } from '../../model/generated/prisma-client';
import { IProblem, ILimit } from '../../interface';
import { parseArgs } from '../../lib/utils';
import { PROBLEM_INFO_MINI } from '../../lib/fragment';

@provide()
@controller('/problem')
export class ProblemController {

  @post('/list')
  async getProblemList(ctx): Promise<void> {
    const options: ILimit = ctx._body;
    ctx.validate({
      pageNo: 'number?',
      pageSize: 'number?',
      where: 'object?',
    }, options);

    let where = options.where || {}
    where = where.text ? {
      OR:[
        {title_contains: where.text},
        {describe_contains: where.text},
        {source_contains: where.text},
      ]
    } : {}

    where = where.status ? {
      where: {
        AND: [
          { status: where.status },
          where
        ]
      }
    } : { where }
    
    let count = await prisma.problemsConnection(where).aggregate().count()
    // 规范参数    
    let { 
      pageSize, 
      pageEnd, 
      pageNo } = parseArgs(options, count)
    
    
    let args = Object.assign({
      skip: (pageNo - 1) * pageSize,
      first: pageSize
    }, where )
    let problems: Problem[] 
    if (where.mini) {
      problems = await prisma.problems(args).$fragment(PROBLEM_INFO_MINI)
    } else {
      problems = await prisma.problems(args)
    }
    ctx.body = {
      pageNo ,
      pageSize ,
      pageEnd ,
      total: count,
      items: problems
    }
  }

  /**
   * 获取具体题目信息
   *
   * @param {*} ctx
   * @returns {Promise<void>}
   * @memberof ProblemController
   */
  @get('/info/:id')
  async getProblemInfo(ctx): Promise<void> {
    const { id } = ctx.params;
    let problemInfo:Problem = await prisma.problem({id})
    ctx.body = {
      problemInfo
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
  async replaceProblem(ctx): Promise<void> {
    const options: IProblem = ctx._body;
    ctx.validate({
      id: 'string?',
      title: 'string',
      status: 'number',
      tags: {type: 'array'},
      describe: 'string',
      inDescribe: 'string',
      outDescribe: 'string',
      inExample: 'string',
      outExample: 'string',
      integral: 'number',
      limitTime: 'number',
      limitMemory: 'number',
      hint: 'string?',
      source: 'string?',
      sourceId: 'string?',
      example: 'string?',
      createUserId: 'string?'
    }, options);

    const arg: ProblemCreateInput = {
      status: options.status,
      type: options.type,
      tags: options.tags,
      title: options.title,
      describe: options.describe,
      inDescribe: options.inDescribe,
      outDescribe: options.outDescribe,
      inExample: options.inExample,
      outExample: options.outExample,
      integral: options.integral,
      limitTime: options.limitTime,
      limitMemory: options.limitMemory,
      hint: options.hint,
      source: options.source,
      sourceId: options.sourceId,
      example: options.example
    }
    if (options.createUserId) {
      arg.createUser = {
        connect: {
          id: options.createUserId
        }
      }
    }
    // 创建或更新
    if (options.id) {
      let problems: Problem = await prisma.updateProblem({
        data: arg,
        where: {
          id: options.id
        }
      })
      ctx.body = {
        items: problems
      }
    } else {
      let problems: Problem = await prisma.createProblem(arg)
      ctx.body = {
        items: problems
      }
    }
  }

}
