import { WebMiddleware, provide, config } from 'midway';

@provide()
export class Jwt implements WebMiddleware {

  @config('jwt')
  jwtConfig;

  resolve() {
    console.log('-------------jwt----------------------');
    
    console.log(this.jwtConfig);
    
    return async (ctx, next) => {
      await next();
    };;
  }

}