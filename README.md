本例在同仓库下，koa_web分支修改而来， 关于本例的疑问和详细介绍，请移步到koa_web分支 readme.md查看讲解。

本例与koa_web的不同，在于新增了一个/testCores 接口，该接口在koa端被截取请求，并转发到http://api.douban.com域名下，解决跨域问题。
本例的缺憾在于，暂时没做使用koa截取前端所有的请求进行转发，而只针对/testCores一个接口做了转发，不过通过这一个接口的转发，
演示了koa如何截取前端请求，进行转发的全过程。
当然，使用koa截取前端所有的请求进行转发，应该也不会太难，估计也就是一个配置而言。

- 启动：
启动方法，因为涉及了一些Linux操作，**请使用git bash启动**，否则报错：
npm start；
在浏览器输入：http://127.0.0.1:4455/
能看到页面上的文字，说明正常

点击页面上的按钮，发送/testCores请求。

注意的是，如何需要重新爬取数据，请放开E:\koa2_films\server\index.js上的注释，然后运行

可以访问以下api：
http://127.0.0.1:4455/testCores
http://127.0.0.1:4455/api/v0/movies
http://127.0.0.1:4455/movies/all
(5c9b91bc1cf9172224c8f21b是id，每次都不同,根据http://127.0.0.1:4455/movies/all接口来)
http://127.0.0.1:4455/movies/detail/5c9b91bc1cf9172224c8f21b 
