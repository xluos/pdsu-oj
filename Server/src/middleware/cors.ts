import { WebMiddleware, provide } from 'midway';
const cors = require('@koa/cors');

@provide()
export class CorsMiddleware implements WebMiddleware {

  resolve() {
    return cors({credentials: true});
  }

}