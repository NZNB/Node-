const handleBlogRouter = require("./blog")
const { login } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const url = require('url')
const handleUserRouter = (req, res) => {
    const method = req.method // GET POST
    let { pathname, query } = url.parse(req.url, true)

    // 登录
    if (method === 'GET' && pathname === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = query
        const result = login(username, password)
        return result.then(res => {
            if (res.username) {
                // 设置session
                const { username, realname } = res
                req.session.username = username
                req.session.realname = realname
                return new SuccessModel(res)
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }

    // 登录验证
    if (method === 'GET' && pathname === '/api/user/login-test') {
        console.log('req.cookie :>> ', req.cookie);
        const { username } = req.session
        if (username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }

}

module.exports = handleUserRouter
