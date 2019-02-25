const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

// import {abc} from './abc.js'
// console.log('225566')
// console.log(abc)
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

  const app = new Koa()
  await useMiddlewares(app)

  app.listen(4455)
})()
