const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
// glob 运行使用星号(*)来匹配，本文的作用在于使用
// glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  // ./schema', '**/*.js 的意思是匹配 schema目录下的所有js文件
  // 这句话的意思是，一次全局加载 schema下的 用户，电影，电影分类建模原型。
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'Scott'
  })

  if (!user) {
    const user = new User({
      username: 'Scott',
      email: 'koa2@imooc.com',
      password: '123abc'
    })

    await user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes++

      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.once('open', () => {
      // 在MongoDB建数据模型
      // const Dog = mongoose.model('Dog', { name: String })
      // const doga = new Dog({ name: '阿尔法' })

      // doga.save().then(() => {
      //   console.log('wang')
      // })
      resolve()
      console.log('MongoDB Connected successfully!')
    })
  })
}