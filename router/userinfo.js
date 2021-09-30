// 导入express
const express = require('express');

// 导入验证数据规则的模块
const expressJoi = require('@escook/express-joi')

// 把路由处理函数封装成模块 需要导入，然后调用
const userInfoHandle = require('../router_handler/userinfo')


// 创建路由
const router = express.Router();

// 获取用户信息，get请求并且 调用处理函数 
router.get('/userinfo', userInfoHandle.getUserInfo);

// 利用结构取出验证规则对象，结构可以不用创建一个接收属性直接调用原来的key update_userinfo_schema ，update_password_schema
const { update_userinfo_schema, update_password_schema } = require('../schema/user')
    // 更新用户信息，post,需要验证id 邮箱 用户名，所以需要导入验证规则局部中间件
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandle.updateUserInfo);

// 更新用户密码post,并且使用验证规则中间件验证密码
router.post('/updatepwd', expressJoi(update_password_schema), userInfoHandle.updatePassword)

module.exports = router;