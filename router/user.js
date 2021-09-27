const express = require('express')

// 导入路由处理函数模块
const routerHandeler = require('../router_handler/user')
const router = express.Router()

// 注册新用户，使用路由处理函数处理回调
router.post('/reguser', routerHandeler.regUser)

// 登录 使用路由处理函数处理回调
router.post('/login', routerHandeler.loginUser)

module.exports = router