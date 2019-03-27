本例为 实时构建前端工程，并且实时在koa搭建的服务器显示的 前后端一体化工程。
本例有很多提交，每次提交的相关信息和功能在同目录下的readmeBackup.md有记录；

- 本示例是一个非常妙的前后端一体的工程，虽然内容简短，但提供了如何前后端一体搭建工程
第10章 【10-1和10-2,可正常运行， npm start，启动后台服务，编译前台代码，然后在浏览器上访问整个页面，实现了整个前后台链路的调通，详见readme】 (hash值:10e5db793965) 
启动方法：
npm start；
在浏览器输入：http://127.0.0.1:4455/
能看到页面上的文字，说明正常

可以访问以下api：
http://127.0.0.1:4455/api/v0/movies

难点理解：
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



