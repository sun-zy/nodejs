'use strict';

// had enabled by egg
// exports.static = true;
// 数据库
exports.mysql = {
  	enable: true,
  	package: 'egg-mysql',
};

// redis缓存
exports.redis = {
  	enable: true,
  	package: 'egg-redis',
};