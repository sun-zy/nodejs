'use strict';

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1543909941861_5688';

	config.security = {
		csrf: {
			enable: false,
			//			queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
			//			bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
			//			ignoreJSON: true,//已废弃 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
			//    useSession: true
		},
		domainWhiteList: ['http://127.0.0.1:7001'],
	};
	// add your config here
	//gzip 压缩body返回
	config.middleware = ['gzip', 'errorHandler'];
	config.bodyParser = {
		enable: true,
		encoding: 'utf8',
		formLimit: '100kb',
		jsonLimit: '100kb',
		strict: true,
		// @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
		queryString: {
			arrayLimit: 100,
			depth: 5,
			parameterLimit: 1000,
		},
	};
	//接口内容压缩
	config.gzip = {
		threshold: 50,
	};
	//允许请求的类型
	config.cors = {
		//		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
	};
	// 连接mysql数据库
	config.mysql = {
	    client: {
		    // host
		    host: '',
		    // 端口号
		    port: '',
		    // 用户名
		    user: '',
		    // 密码
		    password: '',
		    // 数据库名
		    database: ''
	  	},
	  	// 是否加载到 app 上，默认开启
	  	app: true,
	  	// 是否加载到 agent 上，默认关闭
	  	agent: false,
	};
	// redis存储
	config.redis = {
	  	client: {
	    	port: '端口号',  // Redis port
		    host: '主机',   // Redis host
		    password: '密码',
		    db: 0
	  	}
	};

	return config;
};