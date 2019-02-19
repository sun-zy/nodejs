'use strict';

const Service = require('egg').Service;
const statusCode = require('../../util/statusCode');

class AccountLogoutService extends Service {
	async index() {
		const {ctx,app} = this;
		let result = ctx.body;
		// toolToken判断
		if(!!result.flag){
			// token置为空
			await app.redis.del('IVETool:toolToken:' + ctx.get('toolToken'));
			result = statusCode.SUCCESS_0('退出成功！');
		}

		return result;
	}
}

module.exports = AccountLogoutService;