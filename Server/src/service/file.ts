import { provide } from 'midway';
import { IFileService } from "../interface";
import { prisma, ProblemCreateInput } from '../model/generated/prisma-client';
import _ = require('lodash');
const parser = require('fast-xml-parser');

@provide('fileService')
export class FileService implements IFileService {

  async insertHustOjData(data: string, createUserId?: string, createUserName?: string): Promise<number> {
    let result = -1
    if( parser.validate(data) === true) {
      
      const jsonObj = parser.parse(data);
      const items = _.get(jsonObj, 'fps.item', null)
      if (!items) {
        throw Error('文件错误')
      }
      let promiseAll = []
      items.forEach(element => {
        const args: ProblemCreateInput = Object.assign({
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
        }, createUserId ? {
          createUser: {
            connect: {
              id: createUserId
            }
          }
        } : { } )
        promiseAll.push(prisma.createProblem(
          args
        ).$fragment('{id}'))
      });
      result = (await Promise.all(promiseAll)).length
    } else {
      throw Error('文件解析失败')
    }
    return result
  }
  async insertPdsuOjData(data: string, createUserId?: string, createUserName?: string): Promise<number> {
    let result = -1
    const jsonObj: ProblemCreateInput[] = JSON.parse(data);
    if (!Array.isArray(jsonObj)) {
      throw Error('文件错误')
    }
    let promiseAll = []
    jsonObj.forEach(element => {
      const args: ProblemCreateInput = Object.assign(
        element
        , createUserId ? {
      } : { } )
      promiseAll.push(prisma.createProblem(
        args
      ).$fragment('{id}'))
    });
    console.time('promiseAll')
    result = (await Promise.all(promiseAll)).length
    console.timeEnd('promiseAll')

    return result
  }
}
