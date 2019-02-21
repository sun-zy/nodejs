1.直接使用脚手架快速搭建项目，命令如下:

    （1）npm i egg-init -g;

　（2）新建egg-demo文件夹，执行命令：egg-init egg-demo --type=simple;

    （3）进入当前文件夹下，执行命令：npm i;

　（4）启动项目：npm run dev;

           在浏览器中打开：localhost:7001

           注意：这里默认地址是7001，如果修改，可以在config配置文件里面做如下修改：

          // 自定义端口
          config.cluster = {
                 listen: {
                       port: 7010
                 }
          };

         官方说可以在package.json里面配置：egg-scripts start --port=要修改的端口号 --daemon --title=egg-server-egg-demo.（本人测试了一下，没有生效，欢迎提出异议~~~）

2.实现接口：

    （1）在controller文件夹下，新建自己的文件，开始业务书写，这里个人建议可以新建service文件夹，在里面书写自己的复杂业务逻辑，而controller用来接收返回给页面展示；

　 （2）plugin.js用来定义插件；config.default.js用做基本配置，同时自己也可以新建文件来区分开发环境、测试环境以及线上环境；

　（3）代理接口，可以参考 https://blog.csdn.net/baidu_33438652/article/details/81736832；

　　　　这里简单说一下get、post两种常用的请求方法。

　　　　get：

　　　　　　const result = await this.ctx.curl(代理的接口地址,{dataType: 'json'});

　　　　post：

　　　　　　const result = await this.ctx.curl(代理的接口地址,{
　　　　　　　　// 必须指定 method,默认为get
　　　　　　　　method:'POST',
　　　　　　　　// 通过 contentType 告诉 HttpClient 以 JSON 格式发送
　　　　　　　　contentType: 'json',
　　　　　　　　data: 请求参数,
　　　　　　　　// 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
　　　　　　　　dataType: 'json'
　　　　　　});

3.mysql数据库使用：

    （1）mysql安装：npm i egg-mysql  --save，然后在plugin.js里面配置如下：       

　　exports.mysql = {
　　　　enable: true,
　　　　package: 'egg-mysql',
　　};

　　config.default.js配置如下：

　　　　config.mysql = {
　　　　　　client: {　　　　　　　　
　　　　　　　　host: '',// host　　　　　　　　
　　　　　　　　port: '',// 端口号　　　　　　　　
　　　　　　　　user: '',// 用户名　　
　　　　　　　　password: '',// 密码　　　　　　　　
　　　　　　　　database: ''// 数据库名
　　　　　　},
　　　　　　// 是否加载到 app 上，默认开启
　　　　　　app: true,
　　　　　　// 是否加载到 agent 上，默认关闭
　　　　　　agent: false,
　　　　};

　　   这里建议本机安装mysql数据库（https://dev.mysql.com/downloads/file/?id=481160），以及navicat界面管理工具，这样就可以验证自己操作数据库是否成功。

　　（2）数据库的增删改查语法，官网都有实例，可以参考，这里对更新数据库简单说一下：

　　　　let row = {
　　　　　　password（修改的字段）: newPassword（要修改的值）
　　　　},
　　　　options = {
　　　　　　where: {
　　　　　　　　username（查询的条件）:username（查询的值）,
　　　　　　}
　　　　};
　　　　await this.app.mysql.update('数据库名', row, options);

       注意：mysql服务器没有开启，或者配置有误，都会造成项目运行时报错，对应修改就可以了~~~　　

3.redis使用：

　　写接口时，一定会遇到数据存储的问题，这个时候我们通常采用redis存储数据，而非cookie或者storage（一般用于客户端存储）。

　　（1）redis安装：npm i egg-redis --save，然后在plugin.js里面配置如下：       
　　　　exports.redis= {
　　　　　　enable: true,
　　　　　　package: 'egg-redis',
　　　　};

　　　　config.default.js配置如下：

　　　　　　config.redis = {
　　　　　　　　client: {
　　　　　　　　　　port:, // Redis port
　　　　　　　　　　host: '', // Redis host
　　　　　　　　　　password: '',//密码
　　　　　　　　　　db: 1//存储区
　　　　　　　　}
　　　　　　};

　　（2）redis用法（可以下载RedisDesktopManager界面管理工具查看存储情况。）：

　　　　a.正常存储用法：await app.redis.set('key值', 存储值);

　　　　b.一般我们也会遇到对例如token这样存储值时效的设置，代码如下：await app.redis.set('key值', 存储值，'EX'，seconds);

　　　　c.也可以通过命令行设置：

　　　　　  命令启动方法：

　　　　　  通过cmd命令到redis msi(个人安装包存放位置)目录下，执行命令，如：f:\software\redis msi>redis-server.exe redis.windows.conf；

　　　　　  新开窗口执行 F:\software\redis msi>redis-cli.exe -h 127.0.0.1 -p 6379。

　　　　　  然后输入命令：expire key seconds。　　　　

4.项目部署与应用：

　（1）在该文件下打包，生成tgz文件：tar -zcvf ../FileName.tgz

　（2）环境部署（建议下载Xshell客户端，当然别的工具都可以，根据个人喜好~~~）：　　　　　

　　　　a.进入要部署的服务器对应文件夹下，cd 等等；

　　　　b.//创建文件 mkdir 文件名称；

　　　　c.打开压缩包： rz -be；

　　　　d.解包：tar zxvf FileName.tar；

　　　　e.移除压缩包： rm -rf  FileName.tar

　　然后就可以启动啦：npm start即可。


本人原文博客地址：https://blog.csdn.net/sunfrw/article/details/86163748 

注意：
1.其中关于数据库以及redis信息，大家可以根据实际情况自行添加；
2.密码加解密，可以前后端任意生成一对公钥私钥即可。
