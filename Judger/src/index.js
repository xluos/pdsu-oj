const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { dataFile, judge } = require('./core/service');

const app = new Koa();
const router = new Router();

app.use(bodyParser())

router.post('/', async (ctx, next) => {
  console.time('df')
  await dataFile(ctx.request.body)
  ctx.body = judge(ctx.request.body)
  next();
  console.timeEnd('df')
});
// response
app.use(router.routes())
 
app.listen(7767)




