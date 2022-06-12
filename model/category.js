const Model = require('./model.js')

module.exports = class Category extends Model{
    constructor() {
        super()
    }
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,name,`index` FROM category ORDER BY `index` ASC'
            this.query(sql).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取文章类目失败:' + err.message)
                reject(err)
            })
        })
    }
    static getCategoryById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`, `index` FROM category WHERE id = ?'
            this.query(sql, id).then(res => {
                resolve(res[0])
            }).catch(err => {
                console.log('获取某篇文章类目失败:' + err.message)
                reject(err)
            })
        })
    }
    static getCategoryCount(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM category'
            this.query(sql, id).then(res => {
                resolve(res[0].count)
            }).catch(err => {
                console.log('获取类目总数失败:' + err.message)
                reject(err)
            })
        })
    }
    static addCategory(name, index) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO category (`name`, `index`) VALUES (?,?)'
            this.query(sql, [name, index]).then(res => {
                resolve(res.insertId)
            }).catch(err => {
                console.log('增加类目失败:' + err.message)
                reject(err)
            })
        })
    }
    static delCategory(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM category WHERE id=?'
            this.query(sql, [id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('删除类目失败:' + err.message)
                reject(err)
            })
        })
    }
    static setName(id, name) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET name=? WHERE id=?'
            this.query(sql, [name, id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('编辑类目名称失败:' + err.message)
                reject(err)
            })
        })
    }
    static setIndex(id, index) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET `index`=? WHERE id=?'
            this.query(sql, [index, id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('编辑类目索引失败:' + err.message)
                reject(err)
            })
        })
    }
}