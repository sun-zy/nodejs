'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router,controller } = app;
    const version = "/api/v1"
  
    // account 模块
    //0.0 验证码
    router.post(version + '/captcha', controller.account.captcha);
    //0.1 登陆接口
    router.post(version + '/login', controller.account.login);
    //0.2 账号退出
    router.get(version + '/logout', controller.account.logout);
    //0.3 修改密码
    router.post(version + '/modifyPass', controller.account.modifyPass);
};
