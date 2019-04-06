import { controller, post, inject, provide, plugin, get } from 'midway';
import { IUser } from '../../interface';
import { handlePassword, excludePassword } from "../../lib/utils";

@provide()
@controller('/')
export class BaseController {
  @inject('userService')
  service;

  @plugin()
  jwt;

  @post('/signup')
  async signupUser(ctx): Promise<void> {
    const options: IUser = ctx._body;
    ctx.validate({
      userId: { type: 'string', Pattern: /\d{9}/ },
      name: 'string',
      password: { type: 'password', min: 8, max: 16, compare: 'repassword' }
    }, options);
    options.password = handlePassword(options.password);
    console.log(options.password);
    const user: IUser = await this.service.createUser(options);
    ctx.body = {data: user};
  }

  @post('/login')
  async loginUser(ctx): Promise<void> {
    const options: IUser = ctx._body;
    ctx.validate({
      userId: { type: 'string', min: 9, max: 9 },
      password: { type: 'password', min: 8, max: 16}
    }, options);
    let user: IUser = await this.service.queryUserAll(options.userId);
    console.log(user, handlePassword(options.password));
    
    if (user.password === handlePassword(options.password)){
      ctx.cookies.set('pdoj_token', this.jwt.sign(user, { expiresIn: 3600 }), {signed: true, httpOnly: false})
      ctx.body = {userInfo: excludePassword(user)};
    } else {
      throw Error('登录错误');   
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
