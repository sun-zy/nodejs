'use strict';

const Service = require('egg').Service;
const NodeRSA = require('node-rsa');
const base64 = require('Base64');
const statusCode = require('../../util/statusCode');

class AccountModifyPassService extends Service {
	  async index(params) {
        let {ctx,app} = this,
            requestParam = ctx.request.body,//获取请求参数
            privateKey = '', //私钥
            keyRsa = new NodeRSA(privateKey),
            result = ctx.body;//返回信息
        // 判断请求参数
        if(!!requestParam.password && !!requestParam.username && !!requestParam.newpass){
            //获取数据库结果
            let queryDBResult = await app.mysql.query('select username,password from tablename where username = ?', [requestParam.username]);
            //jsencrypt自身使用的是pkcs1加密方案
            keyRsa.setOptions({encryptionScheme: 'pkcs1'});
            
            //获取解密后的更改前以及更改后密码
            let newPwd = keyRsa.decrypt(new Buffer(requestParam.password, 'base64').toString().replace(/%$#%/g,"+"), 'utf8'),
            	oldPwd = keyRsa.decrypt(new Buffer(requestParam.newpass, 'base64').toString().replace(/%$#%/g,"+"), 'utf8');    

            // 用户名存在 code:0 登陆成功  1001：密码错误  1002：用户名不存在  -1：请求参数有误
            if(!queryDBResult.length){
                return statusCode.ERROR('用户名不存在！',1002);
            }

            if(newPwd !== queryDBResult[0].password){
                return statusCode.ERROR('旧密码有误！',1001);
            }

            // 判断token
            if(!!result.flag){              
              	// 更新表
              	let row = {
		    	    password: oldPwd
				},
		        options = {
		  	        where: {
				        username: requestParam.username,
		  	        }
		        };
			    await app.mysql.update('tablename', row, options); 
                result = statusCode.SUCCESS_0('修改密码成功！');
            }

        } else {
            result = statusCode.ERROR('请求参数有误！');
        }
        return result;
    }
}

module.exports = AccountModifyPassService;