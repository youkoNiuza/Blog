const Model = require('./model.js')

Date.prototype.format = function(fmt) {
    var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S" : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
    }
    return fmt; 
}

module.exports = class PV extends Model{
    constructor() {
        super()
    }
    static getTotal() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT SUM(hits) AS total FROM pv'
            this.query(sql).then(res => {
                resolve(res[0].total)
            }).catch(err => {
                console.log('获取总访问量失败:' + err.message)
                reject(err)
            })
        })
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `time`, hits FROM pv ORDER BY `time` ASC'
            this.query(sql).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('获取访问量日志失败:' + err.message)
                reject(err)
            })
        })
    }
    static todayExist() {
        return new Promise((resolve, reject) => {
            let curTime = new Date().format('yyyy-MM-dd')
            let sql = 'SELECT id, `time`,hits FROM pv WHERE `time`=?'
            this.query(sql, [curTime]).then(res => {
                resolve(res)
            }).catch(err => {
                console.log('查看今日点击量失败:' + err.message)
                reject(err)
            })
        })
    }
    static indexPvCount(id,hits) {
        return new Promise((resolve, reject) => {
            if (id) {
                let newHits = hits + 1
                let sql = 'UPDATE pv SET hits=? WHERE id=?'
                this.query(sql, [newHits, id]).then(res => {
                    resolve(res.affectedRows)
                }).catch(err => {
                    console.log('更新点击量失败:' + err.message)
                    reject(err)
                })
            } else {
                let newHits = 1
                let curTime = new Date().format('yyyy-MM-dd')
                const todayPv = {
                    time: curTime,
                    hits:newHits
                }
                let sql = 'INSERT INTO pv SET ?'
                this.query(sql, [todayPv]).then(res => {
                    resolve(res.insertId)
                }).catch(err => {
                    console.log('更新点击量失败:' + err.message)
                    reject(err)
                })
            }
            
        })
    }
    static articlePvCount(id, hits) {
        let newhits = hits + 1
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET hits=? WHERE id=?'
            this.query(sql, [newhits, id]).then(res => {
                resolve(res.affectedRows)
            }).catch(err => {
                console.log('更新文章访问量失败:' + err.message)
                reject(err)
            })
        })
    }
}