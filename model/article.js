const Model = require('./model.js')
const delPicFn = require('../static/picDel')

module.exports = class Article extends Model{
    constructor() {
        super()
    }
    static getHot(num) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article WHERE hot = 1 ORDER BY time DESC LIMIT ?'
            this.query(sql, num).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取热门文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article ORDER BY TIME DESC LIMIT 24'
            this.query(sql).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取文章列表失败:' + err.message)
                reject(err)
            })
        })
    }
    static getListByCategoryId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE category_id = ? ORDER BY TIME DESC'
            this.query(sql, id).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取指定类目文章列表失败:' + err.message)
                reject(err)
            })
        })
    }
    static getListByKeyWord(keyword) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE title LIKE ? ORDER BY TIME DESC'
            this.query(sql, `%${keyword}%`).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取指定关键词文章列表失败:' + err.message)
                reject(err)
            })
        })
    }
    static getArticleById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT a.id, a.title, a.content, a.`time`, a.`hits`, a.`hot`, a.`category_id`, b.name, a.`thumbnail`, a.editTime FROM article a, category b WHERE a.id = ? AND a.`category_id` = b.id;'
            this.query(sql, id).then(res => {
                resolve(res[0])
            }).catch(err => {
                console.log('获取文章详情失败:' + err.message)
                reject(err)
            })
        })
    }
    static getPrevArticle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content FROM article WHERE id < ? ORDER BY id DESC LIMIT 1'
            this.query(sql, id).then(res => {
                resolve(res[0])
            }).catch(err => {
                console.log('获取上一篇文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static getNextArticle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content FROM article WHERE id > ? ORDER BY id DESC LIMIT 1'
            this.query(sql, id).then(res => {
                resolve(res[0])
            }).catch(err => {
                console.log('获取下一篇文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static getCount(category_id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM article WHERE 1=1'

            sql += category_id && category_id != -1 ? ` AND category_id=${category_id}`:''
            sql += hot && hot != -1 ? ` AND hot = ${hot}` : ''
            
            this.query(sql).then(res => {
                resolve(res[0].count)
            }).catch(err => {
                console.log('获取文章总数失败:' + err.message)
                reject(err)
            })
        })
    }
    static getPage(start, size, category_id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,`thumbnail`,hot FROM article WHERE 1=1'

            sql += category_id && category_id != -1 ? ` AND category_id=${category_id}`:''
            sql += hot && hot != -1 ? ` AND hot=${hot}` : ''

            sql+= ' ORDER BY `time` DESC LIMIT ?,?'

            this.query(sql, [start, size]).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取指定页面文章列表失败:' + err.message)
                reject(err)
            })
        })
    }
    static setHot(id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET hot=? WHERE id=?'
            this.query(sql, [hot, id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('设置热门文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static add(article) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO article SET ?'
            this.query(sql, article).then(res => {
                resolve(res.insertId)
            }).catch(err => {
                console.log('添加文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM article WHERE id=?'
            this.query(sql, [id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('删除文章失败:' + err.message)
                reject(err)
            })
        })
    }
    static delPic(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT content, `thumbnail` FROM article WHERE id=?'
            this.query(sql, [id]).then(res => {
                let reg = /\/?upload\/\w+\.\w+/g
                let resReg = res[0].content.match(reg)
                if (res[0].thumbnail) resReg.push(res[0].thumbnail)
                resolve(delPicFn(resReg))
            }).catch(err => {
                console.log('删除文章图片失败:' + err.message)
                reject(err)
            })
        })
    }
    static edit(article) {
        return new Promise((resolve, reject) => {
            let now = new Date()
            let sql = 'UPDATE article SET title=?, content=?, hot=?, category_id=?, thumbnail=?, editTime=? WHERE id=?'
            this.query(sql, [article.title, article.content, article.hot, article.category_id, article.thumbnail, now, article.id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('编辑文章失败:' + err.message)
                reject(err)
            })
        })
    }
}