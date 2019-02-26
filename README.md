- npm start 启动页面；
- npm run pupper 爬取数据或相关事宜

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


第8章 【(此提交为第8章最后完整代码，可正常运行，见readme)对8 剩余章节 code 一些注释补充】 (hash值:3c094db) 
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