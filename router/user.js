const express = require("express");

// 导入路由处理函数模块
const routerHandeler = require("../router_handler/user");
const router = express.Router();

// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");

// 导入需要的验证规则对象,解构赋值
const { reg_login_schema } = require("../schema/user");

// 注册新用户，使用路由处理函数处理回调,使用局部中间件进行表单数据的验证
router.post("/reguser", expressJoi(reg_login_schema), routerHandeler.regUser);

// 登录 使用路由处理函数处理回调
router.post("/login", expressJoi(reg_login_schema), routerHandeler.loginUser);

module.exports = router;