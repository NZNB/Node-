const url = require('url')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    let { pathname, query } = url.parse(req.url, true)
    const id = query.id || ''
    console.log('pathname :>> ', pathname);
    // 获取博客列表
    if (method === 'GET' && pathname === '/api/blog/list') {
        const { author = '', keyword = '' } = req.query
        // const data = getList(author, keyword)
        // return new SuccessModel(data)
        return getList(author, keyword).then(res => {
            return new SuccessModel(res)
        })
    }

    // 博客详情
    if (method === 'GET' && pathname === '/api/blog/detail') {
        const { id } = req.query
        return getDetail(id).then(res => {
            return new SuccessModel(res)
        })
    }

    // 新建博客
    if (method === 'POST' && pathname === '/api/blog/new') {
        const blogData = req.body
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新博客
    if (method === 'POST' && pathname === '/api/blog/update') {

        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel(result)
        } else {
            return new ErrorModel('更新失败')
        }
    }
    // 删除博客
    if (method === 'POST' && pathname === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除失败')
        }
    }
}


module.exports = handleBlogRouter