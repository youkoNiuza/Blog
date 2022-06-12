const Model = require('./model.js')

module.exports = class Log extends Model{
    constructor() {
        super()
    }
    static getPage(start, size) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT handle, `time`, ip FROM `log` ORDER BY `time` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取日志列表失败:' + err.message)
                reject(err)
            })
        })
    }
    static getCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) FROM `log`'
            this.query(sql).then(res => {
                resolve(res[0]['COUNT(1)'])
            }).catch(err => {
                console.log('获取日志总数失败:' + err.message)
                reject(err)
            })
        })
    }
    static add(log) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `log` SET ?'
            this.query(sql, [log]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('记录日志失败:' + err.message)
                reject(err)
            })
        })
    }
}