
项目目录说明：

/src/ 前端源码，修改此源码，自动编译后，页面自动刷新显示修改内容
/server/
       config/  qiqiu 云服务配置文件，本项目基本上与qiniu无关，可以忽略此部分的代码
       crawler/  puppeteer爬取页面数据的文件
       database/  定义数据库 数据schema模型
       lib/  路由装饰器，基本上路由规则都在这里
       middlewares/
                 parcel/ 前端代码parcel-bundler编译，koa-views模板渲染，koa-static静态资源处理都这在里
                 router/ 路由初始化入口页面
       router/ 路由接口数据处理
       service/ mongoose操作数据库，对数据库的查询操作
       tasks/ 爬虫数据库的入口页面，以及拿到爬取数据后的数据处理，将拿到的数据存入mongodb数据库中
nodemon.json //是因为在package.json中用到了nodemon命令，因此配置了














