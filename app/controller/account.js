'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
	/**
	 * 获取验证码
	 */
	async captcha() {

		const {ctx} = this;
		
		//获取service中服务地址数据，调用service中的方法
		const result = await ctx.service.account.captcha.index();

		ctx.body = result;

	}

	/**
	 * 登陆验证
	 */
	async login() {
		let {ctx} = this,
	    	result = await ctx.service.account.login.index();
	    
		ctx.body = result;
	}

	/**
	 * 账号退出
	 */
	async logout() {

		const ctx = this.ctx;
		//获取service中服务地址数据，调用service中的方法
		const result = await ctx.service.account.logout.index();

		ctx.body = result;

	}

	/**
	 * 修改密码
	 */
	async modifyPass() {

		const ctx = this.ctx;
		//获取service中服务地址数据，调用service中的方法
		const result = await ctx.service.account.modifyPass.index();

		ctx.body = result;

	}
}

module.exports = AccountController;