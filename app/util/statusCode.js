const statusCode = {
    // 错误状态码
    ERROR: (msg,code = -1) => {
        return {
            code: code,
            msg
        }
    },

    // 发送成功状态码
    SUCCESS_0: (msg, data) => {
        return {
            code: 0,
            msg,
            data
        }
    }
}

module.exports = statusCode