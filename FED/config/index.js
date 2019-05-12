
let config
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  config = require('./config.prod.json')
} else {
  try {
    config = require('./config.dev.json')
  } catch (e) {
    console.error('请在本地项目中创建配置文件 config/config.dev.json', '\n')
    process.exit(0)
  }
}

module.exports = config
