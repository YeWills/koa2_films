const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const router = require('./routes')

;(async () => {
  // 连接数据库
  await connect()

  // 初始化scama
  initSchemas()

  // 查数据？
  await initAdmin()

  // 爬取电影数据
  // require('./tasks/movie')
  // // 对爬取的数据组装？
  // require('./tasks/api')
  // // 对爬取的数据组装？
  // require('./tasks/trailer')
  // // 对爬取的数据上传到七牛
  // require('./tasks/qiniu')
})()

const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'Scott'
  })
})

app.listen(4455)