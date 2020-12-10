const handleBlogRouter = require("./blog")
const { login } =  require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const url = require('url')
const handleUserRouter = (req, res) => {
    const method = req.method // GET POST
    let { pathname, query } = url.parse(req.url, true)

    // 登录
    if (method === 'POST' && pathname === '/api/user/login') {
        const { username, password } = req.body
        console.log('req.body :>> ', req.body);
        const result = login(username, password)
        console.log('result :>> ', result);
        if (result) {
            return new SuccessModel(result)
        } else {
            return new ErrorModel('登录失败')
        }
    }

}

module.exports = handleUserRouter
