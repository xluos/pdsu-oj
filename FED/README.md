# PDSUOJ-前端代码

## 使用

- 启动调试服务: `npm start`
- 构建 dist: `npm run build`

## 目录结构

- react-router @4.x 默认采用 hashHistory 的单页应用
- 入口文件: `src/index.js`
- 后台导航配置: `src/menuConfig.js`
- 路由配置: 
  - 后台路由 `src/routerConfig.js`
  - 前台路由 `src/routerConfig.js`
- 路由入口: `src/router.jsx`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

```
按需加载lodash文件配置
{
  "libraryName": "lodash",
  "libraryDirectory": "",
  "camel2DashComponentName": false,
  "camel2UnderlineComponentName": false
}
```
