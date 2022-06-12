const mysql = require('mysql')
module.exports = class Model {
    static conn = null
    static connection() {
        Model.conn = mysql.createConnection({
            host: '112.74.87.145',
            user: 'blog',
            password: 'AhR7mWHNzWcZc2wP',
            database:'blog'
        })
        Model.conn.connect(err => {
            if(err)console.log(err)
        })
    }
    static end() {
        if (Model.conn != null) {
            Model.conn.end()
        }
    }
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()
            Model.conn.query(sql, params, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
            this.end()
        })
    }
}