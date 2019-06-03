import { controller, get, provide, Context, inject } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/token')
  async api(ctx: Context) {
    const token = '';
    ctx.body = token;
  }

}
