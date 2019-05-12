const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const { Base64 } = require('js-base64');
const OJ_STATUS = ['OJ_WAIT','OJ_RUN','OJ_AC','OJ_PE','OJ_TLE','OJ_MLE','OJ_WA','OJ_OLE','OJ_CE']
const OJ_WAIT       = 0;    //Queue
const OJ_RUN        = 1;    //RUN
const OJ_AC         = 2;    //AC
const OJ_PE         = 3;    //PE
const OJ_TLE        = 4;    //TLE
const OJ_MLE        = 5;    //MLE
const OJ_WA         = 6;    //WA
const OJ_OLE        = 7;    //OLE
const OJ_CE         = 8;    //CE
const OJ_RE_SEGV    = 9;    //SEG Violation
const OJ_RE_FPU     = 10;   //float.../0
const OJ_RE_ABRT    = 11;   //Abort
const OJ_RE_UNKNOW  = 12;   //Unknow
const OJ_RF         = 13;   //Restricted Function
const OJ_SE         = 14;   //System Error
const OJ_RE_JAVA    = 15;   //Java Run Time Exception

async function dataFile (body) {
  const { testdata, code, language } = body
  const extensions = ['', 'c', 'cpp', 'java']
  console.time('clear')
  await Promise.all([
    fs.emptyDir(path.resolve(__dirname, './temp')),
    fs.emptyDir(path.resolve(__dirname, './testdata'))
  ])
  console.timeEnd('clear')
  
  let promiseAll = []
  console.time('file')
  // 创建meta.json
  const metaPath = path.resolve(__dirname, './meta.json')
  const metaData = {
    testcases: testdata.map(item => ({uuid: item.id}))
  }
  promiseAll.push(fs.writeFile(metaPath, JSON.stringify(metaData)))

  // 创建Main.cpp
  const mainCppPath = path.resolve(__dirname, `./temp/Main.${extensions[language]}`)
  promiseAll.push(fs.writeFile(mainCppPath, Base64.decode(code)))

  // 创建测试数据文件
  for (const file of testdata) {
    promiseAll.push(
      fs.writeFile(
        path.resolve(__dirname, `./testdata/${file.id}.in`)
        , file.in
    ))
    promiseAll.push(
      fs.writeFile(
        path.resolve(__dirname, `./testdata/${file.id}.out`)
        , file.out
    ))
  }
  console.timeEnd('file')
  console.time('fileawait')
  await Promise.all(promiseAll)
  console.timeEnd('fileawait')
}
exports.dataFile = dataFile;
function judge (body) {
  const { language, limitMemory, limitTime, runId } = body;

  shell.cd(__dirname)
  console.log(__dirname)
  console.time('judge')
  console.log('1')
  shell.exec(`./Judge -l ${language} -D ./testdata -d ./temp -t ${limitTime} -m ${limitMemory} -o 81920`)
  console.log('2')
  console.timeEnd('judge')

  // 查看编译信息，是否错误之类的
  const isCe = fs.existsSync(path.resolve(__dirname, './temp/result.json'))
  const ce = isCe ? fs.readFileSync(path.resolve(__dirname, './temp/ce.txt'), { encoding: 'utf8' }).trim() : ''
  if (ce) { // 非空，有错
    return {
      runId,
      result: "CompileError",
      code: OJ_CE,
      error: ce
    }
  }
  
  // 系统错误
  if (!fs.existsSync(path.resolve(__dirname, './temp/result.json'))) {
    return {
      runId,
      result: "System Error",
      code: OJ_SE,
      error: "System Error"
    }
  }
  
  const result = fs.readJsonSync(path.resolve(__dirname, './temp/result.json'))

  let time = 0, memory = 0
  for (const item of result) {
    time = Math.max(time, item.time)
    memory = Math.max(memory, item.memory)
    if (item.judge !== OJ_AC) {
      return {
        runId,
        result: OJ_STATUS[item.judge] || 'OJ_RE' ,
        code: item.judge,
        error: '',
        time,
        memory
      }
    }
  }

  return {
    runId,
    testcases: result,
    result: "AC",
    code: OJ_AC,
    error: '',
    time,
    memory
  }
}
exports.judge = judge;