// 导入验证规则模块
const joi = require('joi')

// 利用joi模块定义验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 向外共享验证规则,针对req的body进行验证，验证的name和alias和body中传的一直可以简写
module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}


// 利用joi模块定义分类的ID验证规则
const id = joi.number().min(1).required()
    // 向外共享验证规则,是path参数所以用param,和客户端传过来的id同名可以简写对象
module.exports.delete_cate_schema = {
    params: {
        id
    }
}