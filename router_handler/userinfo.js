// 导入数据库模块
const db = require('../db/index');


module.exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的SQL语句
    const sqlStr = `select id,username,nickname,email,user_pic from ev_users where id =?`;

    // 执行SQL语句

    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc('获取用户信息失败');

        // 获取用户信息成功

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        });
    })
};