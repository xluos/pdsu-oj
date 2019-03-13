import { controller, post, inject, provide, plugin, get, options } from 'midway';
import { IUser } from '../../interface';

@provide()
@controller('/', {middleware: ['corsMiddleware']})
export class UserController {
  @inject('userService')
  service:{createUser};

  @plugin()
  jwt;

  @options('/signup')
  @post('/signup')
  async getUser(ctx): Promise<void> {
    const options: IUser = ctx.request.body
    options.userId = +options.userId
    try {
      const user: IUser = await this.service.createUser(options);
      ctx.cookies.set('pdoj_token', this.jwt.sign(user, { expiresIn: 3600 }), {signed: true, httpOnly: false})
      ctx.body = {success: true, message: 'OK', data: user};
    } catch (error) {
      ctx.body = error.message
    }
  }

  @options('/gettoken')
  @get('/gettoken')
  async gettoken(ctx): Promise<void> {
    ctx.cookies.set('pdoj_token', this.jwt.sign({ok: true}, { expiresIn: 3600 }), {signed: true, httpOnly: false})
    ctx.body = 'ok';
  }

  @options('/testlogin')
  @get('/testlogin', {middleware: ['jwtMiddleware']})
  async testlogin(ctx): Promise<void> {
    ctx.body = 'ok';
  }
}
