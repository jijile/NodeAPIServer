// 导入数据库操作模块
const db = require('../db/index')

// 导入密码加密模块

const bcrypt = require('bcryptjs')
const { use } = require('../router/user')

// 导入生成token包

const jwt = require('jsonwebtoken')

// 导入加密的配置文件
const config = require('../config')
const { expiresIn } = require('../config')

module.exports.regUser = (req, res) => {
    console.log("reguser")

    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
        // 对表单数据进行合法性校验
        // if (!userInfo.username || !userInfo.password) {
        //     return res.cc("用户名或者密码不合法")
        // }

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

    // const str = 'abc'

    // let [...arr] = str


    // // 数组拼接
    // let arr1 = [1,2,3]

    // let arr2 = [4,5,6]

    // const arr3 = [...arr1,...arr2]

    // let arr = {
    //     "0": "1",
    //     "1": "2",
    //     "2": "3",
    //     "length": 3
    // }

    // let arr = [1, 2, 3]
    // //如果需要对数组遍历中对每个元素进行操作使用Array.from
    // let arr1 = Array.from(arr, item => item * 2)

    // console.log(arr1)

    // console.log(arr)

    // let arr = [1, 2, 3]

    // let result = arr.find(value => value > 2)


    // let result1 = arr.findIndex(value => value > 1)

    // console.log(result, result1)

    // const user = {
    //     username: "zs",
    //     password: '123456'
    // }

    // console.log({username: 'zs', password: '123456',password:'',user_pic:''})

    // console.log({...user,password:''})


    // 接受表单数据
    const userInfo = req.body
        // 定义sql语句
    const sqlStr = `select * from ev_users where username=?`
        // 执行sql语句，根据用户信息查询
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('登录失败！')
            // TODO:判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)

        if (!compareResult) return res.cc('登录失败!')


        // TODO:在服务器端生成token

        //使用扩展运算去除不需要的属性值
        const user = {...results[0], password: '', user_pic: '' }

        // 利用包对用户信息进行加密

        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: expiresIn })

        console.log(tokenStr)

        res.cc({
            status: 0,
            message: '登录成功！',
            token: 'bearer ' + tokenStr
        })


    })

}