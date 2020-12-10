const fs = require('fs')
const http = require('http')
const url = require('url')
const querystring = require('querystring')
let user = {
    name: 'ningzheng',
    password: '123456'
}
http.createServer((req, res) => {
    let path, get, post
    console.log('req.method :>> ', req.method);
    if (req.method === 'GET') {
        let { pathname, query } = url.parse(req.url, true)
        path = pathname
        get = query,
            complete()
    } else if (req.method === 'POST') {
        let array = []
        req.on('data', buffer => {
            array.push(buffer)
        })
        req.on('end', () => {
            post = querystring.parse(Buffer.concat(array).toString())
        })
        complete()
    }
    function complete() {

        if (path === '/login') {
            res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf-8'
            })
            let { username, password } = get
            if (!user[username]) {
                res.end(JSON.stringify({
                    code: 500,
                    message: '用户名不存在'
                }))
            } else if (user[username] !== password) {
                res.end(JSON.stringify({
                    code: 500,
                    message: '密码错误'
                }))
            } else {
                res.end(JSON.stringify({
                    code: 200,
                    message: '登录成功'
                }))
            }
        } else if (path === '/reg') {
            res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf-8'
            })
            let { username, password } = post
            if (user[username]) {
                res.end(JSON.stringify({
                    code: 500,
                    message: '用户名已存在'
                }))
            } else {
                res.end(JSON.stringify({
                    code: 200,
                    message: '注册成功'
                }))
            }
        } else {
            console.log('path :>> ', path);
            fs.readFile(`${__dirname}${path}`, (err, data) => {
                if (err) {
                    res.end('404')
                } else {
                    res.end(data)
                }
            })
        }
    }
}).listen(8000)