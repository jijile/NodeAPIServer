const mysql = require('mysql')

const db = mysql.createPool({
    host: '121.40.154.75',
    user: 'root',
    password: 'Zwlyy123456~',
    database: 'mysql'
})

db.query('select 1', (err, results) => {
    if (err) return console.log(err.message)
    console.log('导入数据库成功')
})

module.exports = db