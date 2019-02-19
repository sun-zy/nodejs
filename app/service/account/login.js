'use strict';

const Service = require('egg').Service;
//解密
const NodeRSA = require('node-rsa');
const base64 = require('Base64');
const statusCode = require('../../util/statusCode');

class AccountLoginService extends Service {
    async index(params) {
        let {ctx,app} = this,
            requestParam = ctx.request.body,//获取请求参数
            privateKey = '', //私钥
            keyRsa = new NodeRSA(privateKey),
            result = {},//返回信息
            IVECaptchaCode = await app.redis.get('IVETool:captchaCode:' + ctx.get('captchaToken'));//验证码
        // 判断请求参数
        if(!!requestParam.password && !!requestParam.username && !!requestParam.captchaCode){
            //获取数据库结果
            let queryDBResult = await app.mysql.query('select username,password from tablename where username = ?', [requestParam.username]);
            
            //jsencrypt自身使用的是pkcs1加密方案
            keyRsa.setOptions({encryptionScheme: 'pkcs1'});
            
            //获取解密后的密码
            let pwd = keyRsa.decrypt(new Buffer(requestParam.password, 'base64').toString().replace(/%$#%/g,"+"), 'utf8');

            // 用户名存在 code:0 登陆成功  1001：验证码错误  1002：密码错误  1003：用户名不存在
            if(!queryDBResult.length){
                return statusCode.ERROR('用户名不存在！',1003);
            }

            if(pwd !== queryDBResult[0].password){
                return statusCode.ERROR('密码错误！',1002);
            }
            
            // 用于日志定位           
            console.log('myIVECaptchaCode you',IVECaptchaCode,requestParam.captchaCode);

            // 判断验证码
            if(!!IVECaptchaCode && IVECaptchaCode === requestParam.captchaCode){
                // 生成token
                let toolToken = Math.random().toString(36).substring(3,7) + Date.now() + Math.random().toString(36).substring(3,7);
                result = {
                    msg:"登陆成功！",
                    code:0,
                    toolToken:toolToken
                }
                // 存储token
                await app.redis.set('IVETool:toolToken:' + toolToken, toolToken,'EX',14400);//设置5H时效
            }else {
                result = statusCode.ERROR('验证码错误！',1001);
            }

        }else {
            result = statusCode.ERROR('请求参数有误！');
        }

        return result;
    }
}

module.exports = AccountLoginService;
