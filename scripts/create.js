#!/bin/node
var fs = require('fs'); // 引入fs模块

const basePath = process.cwd()
const arg = process.argv[2]

if (!arg) {
  console.log('参数不能为空')
  process.exit(0)
}
const indexContent = `
import ${arg} from './${arg}';

export default ${arg};
`
const jsxContent = `
import React from 'react';
import './${arg}.scss';

export default function ${arg} () { return (
  <div className="${arg}-page" >
  </div>
);}
`
const scssContest = `
.${arg}-page {

}
`

try {
  fs.mkdirSync(`${basePath}/src/pages/${arg}/components`, { recursive: true })
  fs.writeFileSync(`${basePath}/src/pages/${arg}/index.js`, indexContent);
  fs.writeFileSync(`${basePath}/src/pages/${arg}/${arg}.jsx`, jsxContent);
  fs.writeFileSync(`${basePath}/src/pages/${arg}/${arg}.scss`, scssContest);
} catch (error) {
  console.log('异常');
  console.error(error);
}