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
        values ('${title}', '${content}', '${createTime}', '${author}')
    `
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(res => {
        if (res.affectedRows) {
            return true
        }
        return false
    })
}

const delBlog = (id, blogData = {}) => {
    const { author } = blogData
    console.log('author :>> ', author);
    if (!author) {
        return false
    }
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(res => {
        if (res.affectedRows) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}