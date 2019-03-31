- 完整前后台一起开发项目，基于 koa2 mongodb。

如果想要更复杂的前端效果，**请启动另外一个仓库https://github.com/YeWills/react-redux-demo 的films_new分支**，此仓库配合了此项目的后台做了接口请求。

-本例有很多提交，每次提交的相关信息和功能在同目录下的**readmeBackup.md**有记录；

- 本示例是一个非常妙的前后端一体的工程，虽然内容简短，但提供了如何前后端一体搭建工程

- 关于启动：
启动方法，因为涉及了一些Linux操作，**请使用git bash启动**，否则报错：
npm start；
在浏览器输入：http://127.0.0.1:4455/
能看到页面上的文字，说明正常

注意的是，如何需要重新爬取数据，请放开E:\koa2_films\server\index.js上的注释，然后运行

可以访问以下api：
http://127.0.0.1:4455/api/v0/movies
http://127.0.0.1:4455/movies/all
(5c9b91bc1cf9172224c8f21b是id，每次都不同,根据http://127.0.0.1:4455/movies/all接口来)
http://127.0.0.1:4455/movies/detail/5c9b91bc1cf9172224c8f21b 

- 关于目录结构

 目录结构 说明 见同级目录下的 **wiki.md**;


- 难点理解：
- 为什么只能显示 /api/v0/movies路由？
为什么只能显示/api/v0/movies路由，而不能显示/movies/all路由，
在E:\koa2_films\server\index.js中，
```
const MIDDLEWARES = ['router', 'parcel']
const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}
```
虽然 resolve(__dirname, `./middlewares/router`)，会加载该目录下的js文件；
但是koa2_films\server\routes目录下的index.js，并没有像movie.js中使用
```
 @get('/')
  async getMovies (ctx, next) {
```
@get 在server\lib\decorator.js 有一个
```
 routerMap.set({
    target: target,
    ...conf
  }, target[key])
```
导致 routerMap中没有E:\koa2_films\server\routes\index.js的路由

- 如何启动前端代码打包，并集成到服务器上的
通过这里在E:\koa2_films\server\index.js中，
```
const MIDDLEWARES = ['router', 'parcel']
const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}
```
这里有一个parcel取值，resolve(__dirname, `./middlewares/parcel`)是前端工程代码
```
//E:\koa2_films\server\middlewares\parcel\dev.js
//Bundler 是类似 webpack的打包工具

const Bundler = require('parcel-bundler')
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/',
  watch: true
})
export const dev = async app => {
  await bundler.bundle()
  //serve koa-static启动加载静态资源
  app.use(serve(r('../../../dist')))
  //views koa-views集成render方法给ctx，在页面中显示前端打包好的index.html
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })
  //views koa-views集成render方法给ctx，在页面中显示前端打包好的index.html
  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}
```

- 本示例主要讲究了以下知识：
koa-static 处理静态资源

koa-views  模板渲染

koa-router  路由

puppeteer 爬虫

parcel-bundler 一款类似webpack的打包库

mongoose mongodb操作库

- 特色：
本示例用一个命令，就可以同时将后台和前台一起启动了；
并且让后台代码和前台代码都在一个域名端口下，这样就不会跨域，
同时又能做到前端代码修改后实施编译刷新页面。


- 注意：
puppeteer 需要科学上网才能安装，如果无法科学上网，就不要运行此项目，否则坑很多。

本项目基于Scott讲师的课程整理而来。


本仓库是学习 koa2 整理出来的demo；
此仓库下还有以下分支


koa_no_router //纯净的koa，使用原生的app.use写接口，不适用koa-router
koa_web   //主分支，前后端一起
puppeteer //纯爬虫demo
small_api //纯后台的demo(含爬虫)
event_IO_loop //nodejs 异步io的理解 阻塞非阻塞，事件循环与驱动，单线程，子进程，进程通讯 events 框架的使用小demo
a51_chapter11_code //此分支不用看，为第11章以后源码备份。
