import { controller, post, provide } from 'midway';
import { prisma } from '../../model/generated/prisma-client';
const fs = require('mz/fs');
const parser = require('fast-xml-parser');
// const path = require('path');

@provide()
@controller('/upload')
export class uploadController {

  @post('/problem')
  async uploadProblem(ctx): Promise<void> {
    console.log(ctx.request.body);
    console.log('got %d files', ctx.request.files.length);
    for (const file of ctx.request.files) {
      console.log('field: ' + file.fieldname);
      console.log('filename: ' + file.filename);
      console.log('encoding: ' + file.encoding);
      console.log('mime: ' + file.mime);
      console.log('tmp filepath: ' + file.filepath);
      // const filePath = path.resolve(__dirname, '../public/')
      let result;
      try {
        // 处理文件
        result = await fs.readFile(file.filepath, 'utf8')
        if( parser.validate(result) === true) { //optional (it'll return an object in case it's not valid)
          const jsonObj = parser.parse(result);
          let promiseAll = []
          jsonObj.fps.item.forEach(element => {
            promiseAll.push(prisma.createProblem({
              title: element.title,
              tags: [],
              describe: element.description,
              inDescribe: element.input,
              outDescribe: element.output,
              inExample: element.sample_input,
              outExample: element.sample_output,
              limitTime: element.time_limit * 1000,
              limitMemory: element.memory_limit * 1024,
              hint: element.hint,
              source: element.source,
              example: element.example
            }))
          });
          result = await Promise.all(promiseAll)
          // await fs.writeFile(`${filePath}problem.json`, JSON.stringify(jsonObj));
          // console.log(jsonObj);
        } else {
          console.log('解析失败');
          throw Error('文件解析失败')
        }
      } finally {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
      ctx.body = result
      // console.log(result);
    }
  }

}
