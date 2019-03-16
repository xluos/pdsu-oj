export default function(options: any, app: any): any {
  return async (ctx: any, next: any) => {
    if(ctx.method === 'OPTIONS') {
      ctx.status = 204
    }
    await next();
  };
}