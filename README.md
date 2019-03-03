# douban-trailer-imooc

在video.js中发现了一个console.log 日志，有些地方在cmd上是无法显示的。

npm script 中使用了rm -rf 这些linux命令，如果在Windows下，使用cmd 运行此命令报错；此时请使用git bash 运行命令；git bash集成了一些Linux命令。

执行 npm run r 或 node server/index.js启动 mongdb服务，测试是否连接好

注意的是，8-2章代码，运行npm start后，需要启动MongoDB。
启动MongoDB的方法：
```
$ mongo
MongoDB shell version v4.0.6
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("8e52734b-1cc3-4f87-b2b2-bd4450b6ff27") }
MongoDB server version: 4.0.6
> show dbs
admin        0.000GB
config       0.000GB
douban-test  0.000GB
local        0.000GB
> use douban-test
switched to db douban-test
> show tables
categories
dogs
movies
users
> db.dogs.find({})
{ "_id" : ObjectId("5c7550f32ef2a9260c9251d8"), "name" : "阿尔法", "__v" : 0 }

```

关于第八章剩余章节代码(hash值:c1d26dbeb89)
本提交主要涉及 
koa2_films\server\database\schema\
koa2_films\database\init
koa2_films\server\index.js
代码思想如下：
从scama 的声明和定义，到model的发布和生成，以及注册到整个应用中，
一直到最后连接完数据库，初始化scama，拿到model，然后过来查数据。

启动方法，就是简单的 npm start即可，因为没有注释了E:\koa2_films\server\index.js 中的几个 require('./tasks/movie')，所以爬取的数据是空的：
启动后运行如下就是正常：
```
$ npm start

> douban-trailer-imooc@1.0.0 start E:\koa2_films
> node server/index.js

MongoDB Connected successfully!
Mongoose: users.findOne({ username: 'Scott' }, { fields: {} })
Mongoose: categories.ensureIndex({ name: 1 }, { unique: true, background: true })
Mongoose: movies.ensureIndex({ doubanId: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ username: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ email: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ password: 1 }, { unique: true, background: true })


```


第8章 【(此提交为第8章最后完整代码，可正常运行，见readme)对8 剩余章节 code 一些注释补充】 (hash值:e13470f9216e3) 
此次提交为第八章整章完整代码，包含网站数据的爬取，mongoose的建数据模型，存数据，查数据。
本提交主要涉及(包含了上次提交的内容，为方便理解，在此一并写上)
koa2_films\server\database\schema\
koa2_films\database\init
koa2_films\server\index.js
代码思想如下：
从scama 的声明和定义，到model的发布和生成，以及注册到整个应用中，
一直到最后连接完数据库，初始化scama，拿到model，然后过来查数据。


启动方法，就是简单的 npm start即可：
启动后运行如下就是正常：
```
$ npm start

> douban-trailer-imooc@1.0.0 start E:\koa2_films
> node server/index.js

MongoDB Connected successfully!
Mongoose: users.findOne({ username: 'Scott' }, { fields: {} })
Mongoose: categories.ensureIndex({ name: 1 }, { unique: true, background: true })
Mongoose: movies.ensureIndex({ doubanId: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ username: 1 }, { unique: true, background: true })
Mongoose: movies.find({ '$or': [ { summary: { '$exists': false } }, { summary: null }, { year: { '$exists': false } }, { title: '' }, { summary: '' } ] }, { fields: {} })
Mongoose: movies.find({ '$or': [ { video: { '$exists': false } }, { video: null } ] }, { fields: {} })
Mongoose: movies.find({ '$or': [ { videoKey: { '$exists': false } }, { videoKey: null }, { videoKey: '' } ] }, { fields: {} })
Start visit the target page

............因 数据太多，在此省略

```


第9章 【(此代码可运行，见readme)第9章 9-1，实现一个最小统计的api】 (hash值:03b4378060) 

启动方法，就是简单的 npm start：
然后在 浏览器中访问以下地址，见到数据则正常：
http://127.0.0.1:4455/movies/all
http://127.0.0.1:4455/movies/detail/5c7576ff72fde1318ce1739a  (注意的detail后的id，从上个路由中拾取)

启动后运行如下就是正常：
```
$ npm start

> douban-trailer-imooc@1.0.0 start E:\koa2_films
> node server/index.js

MongoDB Connected successfully!
Mongoose: users.findOne({ username: 'Scott' }, { fields: {} })
Mongoose: categories.ensureIndex({ name: 1 }, { unique: true, background: true })
Mongoose: movies.ensureIndex({ doubanId: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ username: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ email: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ password: 1 }, { unique: true, background: true })

```

第9章 【(此代码可运行，见readme)第9章剩余章节code，为网站增加路由与控制器层对外提供 API 服务】 (hash值:a553b7f982b) 

启动方法 ：
- **本次提交启动方法为 node start，而非npm start**，这是因为用到了装饰器已经import等这些es6特性，需要经过
start.js 编译。
- 本次提交的入口文件是 start.js，而非 server/index.js；
在cmd中执行 node start；
然后在浏览器上 运行 http://127.0.0.1:4455/api/v0/movies  ，有数据返回则正常
启动后运行如下就是正常：
```
$ node start
MongoDB Connected successfully!
Mongoose: users.findOne({ username: 'Scott' }, { fields: {} })
Mongoose: categories.ensureIndex({ name: 1 }, { unique: true, background: true })
Mongoose: movies.ensureIndex({ doubanId: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ username: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ email: 1 }, { unique: true, background: true })
Mongoose: users.ensureIndex({ password: 1 }, { unique: true, background: true })
Mongoose: movies.find({}, { fields: {} })

```


第10章 【10-1和10-2,可正常运行， npm start，启动后台服务，编译前台代码，然后在浏览器上访问整个页面，实现了整个前后台链路的调通，详见readme】 (hash值:10e5db793965) 
启动方法：
npm start；
在浏览器输入：http://127.0.0.1:4455/
能看到页面上的文字，说明正常




项目目录说明：
- schema 目录
koa2_films\server\database\schema\
schema目录是用mongo给 MongoDB建数据模型的。
schema\movie.js.js 给电影建数据模型
schema\user.js 给用户数据（如 密码）建数据模型
schema\category.js 给电影分类建数据模型

- tasks 目录
koa2_films\server\tasks\
tasks目录下的js是用来爬取数据的

- src 目录
E:\koa2_films\src\
src目录下 是前端代码

nodemon.json  用来监听编译的
{
  "restartable": "rs",//定义别名 rs
  "ignore": [//忽略这些目录的变化
    ".git",
    "node_modules/**/node_modules" 
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "watch": [
    "server/",
    "src/views",
    "views"
  ],
  "ext": "js json"
}

<!-- 删除dist，删除.cache，设置环境变量，使用nodemon启动 start.js -->
  "start": "rm -rf dist && rm -rf .cache && NODE_ENV=development nodemon ./start.js",




第11章
不可运行的原因是 npm start 的时候，未能编译完成，翻看git bash，可以看到一直卡住了，只有出现'√  Built in 16.84s.'是正常：
```
∞  Building iterator.js...
∞  Building hmr-runtime.js...
∞  Building js-loader.js...
√  Built in 16.84s.
```
上一个提交时正常的，可以在上一次提交中叠加 本次提交，然后一遍遍运行代码看。
另外，运行不同过时，考虑以下解决方法：
任务器中 结束node进程；
关闭当次 bash窗口，另开一个运行；
重启电脑？