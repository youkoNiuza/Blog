const Model = require('./model.js')

module.exports = class Tab extends Model{
    constructor() {
        super()
    }
    static getTagByArticleId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, `name` FROM tabs WHERE article_id = ?'
            this.query(sql, id).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取标签列表失败:' + err.message)
                reject(err)
            })
        })
    }
}