import { controller, post, inject, provide, plugin, get } from 'midway';
import { IUser } from '../../interface';

@provide()
@controller('/')
export class UserController {
  @inject('userService')
  service;

  @plugin()
  jwt;

  @post('/signup')
  async getUser(ctx): Promise<void> {
    const options: IUser = ctx.request.body
    options.userId = +options.userId
    try {
      const user: IUser = await this.service.createUser(options);
      ctx.cookies.set('pdoj_token', this.jwt.sign(user, { expiresIn: 3600 }), {signed: true, httpOnly: false})
      ctx.body = {data: user};
    } catch (error) {
      ctx.body = error.message
    }
  }

  @get('/gettoken')
  async gettoken(ctx): Promise<void> {
    ctx.cookies.set('pdoj_token', this.jwt.sign({ok: true}, { expiresIn: 3600 }), {signed: true, httpOnly: false})
    ctx.body = 'ok';
  }

  @get('/testlogin', {middleware: ['jwtMiddleware']})
  async testlogin(ctx): Promise<void> {
    ctx.body = 'ok';
  }
}
