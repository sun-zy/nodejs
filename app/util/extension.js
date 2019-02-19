const statusCode = require('./statusCode')

// 工具校验
const utilCheck = {
	/*
	* @param param:参数校验
	* 不存在 return -1；存在 return 1，表示成功 
	 */
	paramCheck:(param) => {
		if(!!param){
			return true;		
		}		
		return statusCode.ERROR("请求参数有误！");
	}
}

module.exports = utilCheck;