// 导入数据库模块
const db = require('../db/index');

// 导入处理密码模块
const bcrypt = require('bcryptjs')

//获取用户信息的路由处理函数
module.exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的SQL语句
    const sqlStr = `select id,username,nickname,email,user_pic from ev_users where id =?`;

    // 执行SQL语句 req.user是express-jwt中间件自己处理数据挂在在req上
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err); //数据库操作失败
        if (results.length < 1) return res.cc('获取用户信息失败！')
            // 获取用户信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        });
    })
};
// 更新用户信息的处理函数
module.exports.updateUserInfo = (req, res) => {
    // 定义sql语句
    const sqlStr = `update ev_users set ? where id=?`
        // 执行sql,传输参数
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
            // 如果执行结果没有影响行数也报错
        if (results.affectedRows != 1) return res.cc('更新用户基本信息失败')
            // 更新成功
        res.cc('更新用户信息成功！')
    })
}

// 更新密码路由函数
module.exports.updatePassword = (req, res) => {
    // 根据id查询用户信息

    const sqlStr = `select * from ev_users where id=?`

    // 执行根据id 查询用户信息的SQL语句

    db.query(sqlStr, req.user.id, (err, results) => {
        // sql执行失败
        if (err) return res.cc(err)
            //没有查询到用户
        if (results.length != 1) return res.cc('用户不存在！')
            //TODO:判断用户输入的旧密码是否正确
            // 使用密码处理模块对用户传输的旧密码和数据库中的密码进行对比是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码不正确！')
            // 旧密码正确
            // TODO:更新数据库中对应的新密码
        const sql = `update ev_users set password=? where id=?`
            //利用模块bcrypt对新密码进行加密
        const newCryptPwd = bcrypt.hashSync(req.body.newPwd, 10)
            // 执行SQL
        db.query(sql, [newCryptPwd, req.user.id], (err, results) => {
            // 数据错误
            if (err) return res.cc(err)
                // 根据影响行数来判断是否更新成功
            if (results.affectedRows != 1) return res.cc('更新密码失败！请重试')
                // 更新成功
            res.cc('更新密码成功', 0)
        })
    })

}

// 更新用户头像的路由处理函数
module.exports.updataAvatar = (req, res) => {
    // 定义更新头像的SQL语句
    const sql = `update ev_users set user_pic=? where id=?`
        // 执行SQL
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // sql执行失败
        if (err) return res.cc(err)
            // 是否影响一行数据
        if (results.affectedRows != 1) return res.cc('更新头像失败')
            // 更新成功
        res.cc('更新头像成功！', 0)
    })
}