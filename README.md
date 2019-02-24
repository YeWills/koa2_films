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
