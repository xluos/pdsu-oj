import { controller, post, provide, inject } from 'midway';
import { IFileService } from '../../interface';
const fs = require('mz/fs');
// const path = require('path');

@provide()
@controller('/upload')
export class uploadController {

  @inject('fileService')
  service:IFileService;

  @post('/problem')
  async uploadProblem(ctx): Promise<void> {
    const options = ctx._body;
    ctx.validate({
      type: /^\d{1,2}$/,
      createUserName: 'string',
      createUserId: 'string',
    }, options);
    let file = ctx.request.files[0]
    let result = -1;
    try {
      // 处理文件
      const data = await fs.readFile(file.filepath, 'utf8')
      switch (options.type) {
        case '0':
          result = await this.service.insertPdsuOjData(data, options.createUserId)
          break;
        case '1':
          result = await this.service.insertHustOjData(data, options.createUserId)
          break;
        default:
          break;
      }
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath);
    }
    ctx.body = {result}
  }

}
