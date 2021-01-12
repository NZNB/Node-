const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const url = require('url')
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + 365 * 24 * 3600 * 1000)
    return d.toUTCString()
}
// session数据
let SESSION_DATA = {}
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

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        let [key, value] = item.split('=')
        req.cookie[key.trim()] = value
    })
     // 解析session
    let isSetCookie = false
    let { userId } = req.cookie
    if (userId) {
        const sessionUserId = SESSION_DATA[userId]
        if (!sessionUserId) {
            SESSION_DATA[userId] = {}
        }
    } else {
        userId = Date.now() + '_' + Math.random()
        SESSION_DATA[userId] = {}
        isSetCookie = true
    }
    req.session = SESSION_DATA[userId]
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (isSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path:/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理user路由
        const userData = handleUserRouter(req, res)
        console.log('userData :>> ', userData);
        if (userData) {
            userData.then(userData => {
                if (isSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path:/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        // 未命中返回404

        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })
}
module.exports = serverHandle
