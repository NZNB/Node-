const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }

    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by create_time desc;`

    return exec(sql)
    
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blog包含title,content,author属性
    const { title, content, author } = blogData
    const createTime = Date.now()
    const sql = `
        insert into blogs (title, content, create_time, author )
        values ('${title}', '${content}', '${author}', '${createTime}')
    `
    return exec(sql).then(res => {
        console.log('res :>> ', res);
        return {
            id: res.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}