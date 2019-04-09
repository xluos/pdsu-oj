import { controller, post, provide } from 'midway';
import { 
  prisma, 
  Contest, 
  UserGroupWhereUniqueInput, 
  ContestProblemWhereUniqueInput,
} from '../../model/generated/prisma-client';
import { IContest } from '../../interface';

@provide()
@controller('/contest')
export class ContestController {

  @post('/list')
  async getContestList(ctx): Promise<void> {
    // const options: IUser = ctx._body;
    // ctx.validate({
    //   userId: { type: 'string', min: 9, max: 9 },
    //   password: { type: 'password', min: 8, max: 16}
    // }, options);
    let contests: Contest[] = await prisma.contests()
    ctx.body = {
      items: contests
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
