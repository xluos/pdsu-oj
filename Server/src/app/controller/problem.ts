import { controller, post, provide } from 'midway';
import { prisma, Problem, ProblemCreateInput } from '../../model/generated/prisma-client';
import { IProblem } from '../../interface';

@provide()
@controller('/problem')
export class ProblemController {

  @post('/list')
  async getProblemList(ctx): Promise<void> {
    // const options: IUser = ctx._body;
    // ctx.validate({
    //   userId: { type: 'string', min: 9, max: 9 },
    //   password: { type: 'password', min: 8, max: 16}
    // }, options);
    let problems: Problem[] = await prisma.problems()
    ctx.body = {
      items: problems
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
