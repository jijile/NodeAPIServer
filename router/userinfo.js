// 导入express
const express = require('express');

// 把路由处理函数封装成模块 需要导入，然后调用

const userInfoHandle = require('../router_handler/userinfo')

// 创建路由
const router = express.Router();

// get请求并且 调用处理函数 
router.get('/userinfo', userInfoHandle.getUserInfo);

module.exports = router;