const Bundler = require('parcel-bundler')
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)
// 在readme中有关于这段代码的解释
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/',
  watch: true
})

export const dev = async app => {
  await bundler.bundle()

  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  app.use(async (ctx) => {
    await ctx.render('index.html')
  })
}