import { controller, post, provide } from 'midway';

@provide()
@controller('/submit')
export class SubmitController {

  @post('/upProblem')
  async upProblem(ctx): Promise<void> {
    const options = ctx._body;
    ctx.validate({
      pid: 'string',
      type: 'number',
      value: 'string'
    }, options);
    

    ctx.body = {
      message: '通过',
      options
    };
  }
}
