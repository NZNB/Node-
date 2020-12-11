const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const url = require('url')

// 处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise
}
const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    // 获取query
    let { pathname, query } = url.parse(req.url, true)
    req.path = pathname
    req.query = query

    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                console.log('blogData :>> ', blogData);
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理user路由
        const userData = handleUserRouter(req, res)
        console.log('userData :>> ', userData);
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }
        // 未命中返回404

        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })
}
module.exports = serverHandle

// const resData = {
//     name: 'ningzheng',
//     age: 27,
//     env: process.env.NODE_ENV
// }