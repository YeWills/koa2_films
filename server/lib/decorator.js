const Router = require('koa-router')
const rp = require('request-promise-native')
const mongoose = require('mongoose')
const { resolve } = require('path')
const _ = require('lodash')
const glob = require('glob')

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

const isArray = c => _.isArray(c) ? c : [c]

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    //resolve(this.apiPath, './**/*.js')  this.apiPath 目录下的所有js文件
    // 操作/routes目录下所有的路由js文件
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    // routerMap将不包含E:\koa2_films\server\routes\index.js的路由，原因见readme.md
    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.router.get('/testCores', async (ctx, next) => {
        const url = `http://api.douban.com/v2/movie/1764796`
        const res = await rp(url)
        console.log(res)
        let body
        try {
          body = JSON.parse(res)
        } catch (err) {
          console.log(err)
        }
        console.log(body)
      ctx.body = {
          movies:body
      }
   })


    // http://127.0.0.1:4455/movies/all
    this.router.get('/movies/all', async (ctx, next) => {
      const Movie = mongoose.model('Movie');
      const movies = await Movie.find({}).sort({
          'meta.createdAt': -1
      })
      ctx.body = {
          movies
      }
   })
    // http://127.0.0.1:4455/movies/detail/5c98ff2901d1b42ba8aa8749
    this.router.get('/movies/detail/:id', async (ctx, next) => {
      const Movie = mongoose.model('Movie');
      const id = ctx.params.id;
      const movie = await Movie.findOne({_id: id})
      ctx.body = {
          movie
      }
    })

    this.router.get('/movies/all', async (ctx, next) => {
      const Movie = mongoose.model('Movie');
      const movies = await Movie.find({}).sort({
          'meta.createdAt': -1
      })
      ctx.body = {
          movies
      }
   })

  

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)

  routerMap.set({
    target: target,
    ...conf
  }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'post',
  path: path
})

export const put = path => router({
  method: 'put',
  path: path
})

export const del = path => router({
  method: 'del',
  path: path
})

export const use = path => router({
  method: 'use',
  path: path
})

export const all = path => router({
  method: 'all',
  path: path
})


