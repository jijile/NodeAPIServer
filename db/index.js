const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'student'
})

db.query('select 1', (err, results) => {
    if (err) return console.log(err.message)
    console.log('导入数据库成功')
})

module.exports = db