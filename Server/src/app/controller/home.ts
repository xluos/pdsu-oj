import { controller, plugin, get, provide, Context, inject } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @plugin()
  jwt;

  @get('/token')
  async api(ctx: Context) {
    const token = this.jwt.sign({ foo: 'bar' }, { expiresIn: 10 });
    console.log(token)
    console.log(this.jwt.decode(token))
    ctx.body = token;
  }

}
