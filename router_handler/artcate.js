// 导入db模块
const db = require('../db/index')
    // 路由处理函数模块
module.exports.getArtCates = (req, res) => {
    // 定义查询表sql
    const sqlStr = `select * from ev_artcate where is_delete=0 order by Id asc`

    // 执行sql
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) return res.cc('没有找到文章')
            // 找到文章
        res.cc({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}

// 新增文章分类的处理函数
module.exports.addArticleCates = (req, res) => {
    // 定义sql
    const sqlStr = `select * from ev_artcate where name=? or alias=?`

    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        // 判断sql是否成功
        if (err) return res.cc(err)
            // 判断数据的length
        if (results.length === 2) return res.cc('分类名称和别名被占用请更换！')

        if (results.length === 1) {
            if (results[0].name === req.body.name && results[0].alias === req.body.alias) {
                return res.cc('分类名称和别名被占用请更换！')
            } else if (results[0].name === req.body.name) {
                return res.cc('分类名称被占用请更换！')
            } else if (results[0].alias === req.body.alias) {
                return res.cc('分类别名被占用请更后换重试！')
            }
        }
        // TODO:分类名称和别名都可用执行添加
        // 新增分类sql

        const sql = `insert into ev_artcate set ?`

        db.query(sql, req.body, (err, results) => {
            // 执行sql失败
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类是被请重试！')
            res.cc('新增文章分类成功！', 0)
        })

    })
}

// 封装删除文章分类的路由处理函数
module.exports.deleteCateById = (req, res) => {
    // sql
    const sql = `update ev_artcate set is_delete=1 where id=?`
        // 调用sql
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章失败！')
        res.cc('删除文章分类成功!', 0)
    })
}

// 封装根据id获取文章分类的路由函数

module.exports.getCatesById = (req, res) => {
    res.cc('获取文章分类')
}