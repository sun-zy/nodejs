const statusCode = require('../util/statusCode')

/**
 * 判断token是否可用
 */
module.exports = (option, app) => {
    return async function (ctx, next) {
        try {
            let flag = true;
            // toolToken统一判断
            const toolToken = ctx.header.tooltoken,
                redisToolToken = await app.redis.get('IVETool:toolToken:' + toolToken);
            
            if(!!toolToken && !redisToolToken) {
                ctx.body = statusCode.ERROR('toolToken失效',9999);
            }else if(!!toolToken && redisToolToken === toolToken) {
                ctx.body = {
                    flag
                };
            }else { 
                ctx.body = statusCode.ERROR('toolToken err',9001);
            }

            await next();
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;
            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = { error };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = status;
        }
    }
}
