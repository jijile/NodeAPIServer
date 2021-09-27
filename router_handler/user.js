// 导入数据库操作模块
const db = require('../db/index')

// 导入密码加密模块

const bcrypt = require('bcryptjs')

module.exports.regUser = (req, res) => {
    console.log("reguser")

    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
        // 对表单数据进行合法性校验
    if (!userInfo.username || !userInfo.password) {
        return res.cc("用户名或密码不合法")
    }

    // 定义sql语句 查询用户名是否被占用

    const sqlStr = 'select * from ev_users where username=?'

    console.log(userInfo.username)

    // 执行查询数据
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换用户名')
        }

        // TODO:用户名可以使用
        // 调用brcrypt.hashSync()对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        console.log(userInfo)

        // 定义插入新用户的sql语句

        const insertSql = 'insert into ev_users set ?'


        db.query(insertSql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            //判断执行语句是否成功
            if (err) return res.cc(err)
                // 根据影响行数来判断执行是否成功
            if (results.affectedRows != 1) {
                return res.cc("注册用户失败，请稍后再试！")
            }
            // 注册成功

            res.cc("注册成功", 0)
        })

    })

}

module.exports.loginUser = (req, res) => {
    res.send('loginok')
}