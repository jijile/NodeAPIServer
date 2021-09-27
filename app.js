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

// 导入并且使用路由模块中间件
const userRouter = require('./router/user')
app.use('/api', userRouter)
    // 启动服务

// 路由之后定义错误捕捉中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        //表单验证错误
        res.cc(err)
    }
    res.cc(err)
})


app.listen(3009, () => {
    console.log("running at 127.0.0.1")
})