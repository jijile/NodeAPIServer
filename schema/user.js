// 导入定义验证规则的包

const joi = require('joi')

// 定义登录注册的用户名和密码的验证规则

const username = joi.string().alphanum().min(1).max(10).required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证注册和登录数据表单的规则对象
module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 定义id ,nickname,email的验证规则

const id = joi.number().integer().min(1).required()

const nickname = joi.string().required()

const email = joi.string().email().required()


module.exports.update_userinfo_schema = {
    body: {
        //es6 key和value相同可以简写
        id,
        nickname,
        email
    }
}

// 创建验证密码的规则对象
module.exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 定义验证头像的规则对象
const avatar = joi.string().dataUri().required()
    // 暴露验证规则对象
module.exports.update_avatar_schema = {
    body: {
        // 定义的参数和验证头像规则重名这边可以简写
        avatar
    }
}