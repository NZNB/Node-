const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'my_blog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'my_blog'
    }
}

module.exports = {
    MYSQL_CONF
}