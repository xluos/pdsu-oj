import { controller, plugin, get, provide, Context, inject, post } from 'midway';

@provide()
@controller('/problem')
export class ProblemController {
  @get('/:id')
  async getProblemInfo(ctx) {
    
  }

  @post('/')
  async create(ctx) {
    const createRule = {
      
    }
    const { _body: body, validate } = ctx
    validate(createRule, body)
  }
}