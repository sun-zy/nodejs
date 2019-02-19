'use strict';

const Service = require('egg').Service;
const base64 = require('Base64');
// 图片验证码
const svgCaptcha = require('svg-captcha');
const utilCheck = require('../../util/extension')

class AccountCaptchaService extends Service {
	async index() {
		let {ctx,app} = this,
        	option = ctx.request.body,//获取请求参数
        	result = utilCheck.paramCheck(option);

        // 校验参数是否存在
        if(!!result){
        	let code = svgCaptcha.create(option),
		    	// 生成ctoken
	        	IVECaptchaToken = Math.random().toString(36).substring(3,7) + Math.random().toString(36).substring(3,7);
		    // 保存到redis,忽略大小写：验证码、IVECaptchaToken
		    await app.redis.set('IVETool:captchaCode:' + IVECaptchaToken, code.text.toLowerCase(),'EX',300);//设置5分钟时效
		    result = {
		    	img:code.data,
				captchaToken:IVECaptchaToken
		    }
        }

        return result;
	}
}

module.exports = AccountCaptchaService;