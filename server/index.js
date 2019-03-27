const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const R = require('ramda')
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

;(async () => {
  await connect()

  initSchemas()

  await initAdmin()

  // 这四句注释是用来爬取数据的，因为豆瓣网页爬取的次数有限制，所以只要爬取数据存入数据库后，
  // 数据库有数据供项目使用了，
  // 就将这四句注释，如果要看爬取数据，解注试试
  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')

  const app = new Koa()
  await useMiddlewares(app)

  app.listen(4455)
})()
