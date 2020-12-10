const mysql = require('mysql')

// 创建链接对象
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'my_blog'
})

// 开始连接
connect.connect()

// 执行 sql 语句

// const sql = 'select * from users;'
// const sql = `update users set realname='lisi2' where username='lisi'`
const sql = `insert into users (username, password, realname) values ('wangwu', '123', '王五')`
connect.query(sql, (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(res);
})

// 关闭连接
connect.end()