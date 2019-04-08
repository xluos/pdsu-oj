#!/bin/node
var fs = require('fs'); // 引入fs模块

const basePath = process.cwd()

for(var i = 2 ; process.argv[i]; i++) {

  const arg = process.argv[i]

  if (!arg) {
    console.log('参数不能为空')
    process.exit(0)
  }

  var args = arg.replace(/([A-Z])/g, '_$1').split('_').filter(val => val)

  // createFile(arg, args)
}

for(var i = 2 ; process.argv[i]; i++) {

  const arg = process.argv[i]

  if (!arg) {
    console.log('参数不能为空')
    process.exit(0)
  }
  console.log(`import ${arg} from './pages/${arg}';`)
}

for(var i = 2 ; process.argv[i]; i++) {

  const arg = process.argv[i]

  if (!arg) {
    console.log('参数不能为空')
    process.exit(0)
  }
  var args = arg.replace(/([A-Z])/g, '_$1').split('_').filter(val => val)
  console.log(`{
    path: '/admin/${args[0].toLowerCase()}/${args[1].toLowerCase()}',
    component: ${arg},
  },`)
}





function createFile (arg, args) {

  const indexContent = `
  import ${arg} from './${arg}';

  export default ${arg};
  `
  const jsxContent = `
  import React from 'react';
  import IceContainer from '@icedesign/container';
  import { Breadcrumb } from '@alifd/next';
  import { Link } from 'react-router-dom';

  export default function ${arg} () {
    return (
      <div className="${arg}-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/${args[0].toLowerCase()}/list">${args[0]}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>${args[1]}</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
      </div>
    );
  }
  `

  try {
    fs.mkdirSync(`${basePath}/src/pages/${arg}/components`, { recursive: true })
    fs.writeFileSync(`${basePath}/src/pages/${arg}/index.js`, indexContent);
    fs.writeFileSync(`${basePath}/src/pages/${arg}/${arg}.jsx`, jsxContent);
    // fs.writeFileSync(`${basePath}/src/pages/${arg}/${arg}.scss`, scssContest);
  } catch (error) {
    console.log('异常');
    console.error(error);
  }
}
