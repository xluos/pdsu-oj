const cors = require('@koa/cors');

export default function(options: any, app: any): any {
  return cors(options)
}