// 导入express
const express = require('express')

// 在错误判断里面需要用到joi

const joi = require('joi')

// 创建服务器
const app = express()

// 导入并配置cors中间件解决跨域问题
const cors = require('cors')

app.use(cors())

// 配置解析表单数据中间件，内置中间件只能解析application/x-www-form-urlencoded格式表单数据
app.use(express.urlencoded({ extended: false }))

// 一定要在所有路由之前封装res.cc函数
app.use((req, res, next) => {
    // status默认=1，表示失败
    // err的值可能是对象Error可能是字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 配置需要验证token的中间件，中间件一定要在路由之前
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))


// 这边的思路是一个url前缀作为一个中间件
// 导入user模块并且挂载api url前缀和中间件
const userRouter = require('./router/user')
app.use('/api', userRouter);

// 导入用户信息模块，并且挂载中间件和url前缀
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter);

// 文章分类路由
// 导入文章分类路由模块
const artRouter = require('./router/artcate')
    // 调用路由模块中间件
app.use('/my/article', artRouter)

// 路由之后定义错误捕捉中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        //表单验证错误
        return res.cc(err);
    }
    // 身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err);
})

// 启动服务
app.listen(3009, () => {
    console.log("running at 127.0.0.1")
})