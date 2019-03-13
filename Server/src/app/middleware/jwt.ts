import { WebMiddleware, provide, config } from 'midway';
const jwt = require('koa-jwt2');

@provide()
export class JwtMiddleware implements WebMiddleware {

  @config('jwt')
  jwtConfig;

  resolve() {
    return jwt(this.jwtConfig);
  }

}