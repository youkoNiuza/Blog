const Model = require('./model.js')
const generatePwd = require('../static/generatePwd')

module.exports = class User extends Model{
    constructor() {
        super()
    }
    static login(username, pwd) {
        return new Promise((resolve, reject) => {
            const password = generatePwd(pwd)
            let sql = 'SELECT id, username FROM `user` WHERE username = ? AND PASSWORD = ?'
            this.query(sql, [username, password]).then(res => {
                resolve(res[0])
            }).catch(err => {
                console.log('登陆失败:' + err.message)
                reject(err)
            })
        })
    }
    static lastLoginTime() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `time` FROM `log` WHERE handle = '登陆' ORDER BY `time` DESC LIMIT 1"
            this.query(sql).then(res => {
                resolve(res[0].time)
            }).catch(err => {
                console.log('获取上一次登陆时间失败:' + err.message)
                reject(err)
            })
        })
    }
}