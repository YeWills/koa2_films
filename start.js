// 因为用到了装饰器已经import等这些es6特性，需要经过start.js 编译。
require('babel-core/register')()
require('babel-polyfill')
require('./server/index.js')
