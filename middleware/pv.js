const PV = require('../model/pv')

module.exports = {
    getTotal: (req, res, next) => {
        PV.getTotal().then(result => {
            req.pvTotal = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    getAll: (req, res, next) => {
        PV.getAll().then(result => {
            req.pvs = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    todayExist: (req, res, next) => {
        PV.todayExist().then(result => {
            if (result[0]) {
                let { id, time, hits } = result[0]
                const todayPv = {
                    id: id,
                    time: time,
                    hits: hits
                }
                req.todayPv = todayPv
            } else {
                req.todayPv = null
            }
            next()
        }).catch(err => {
            next(err)
        })
    },
    indexPvCount: (req, res, next) => {
        if (req.todayPv) {
            let {id, hits} = req.todayPv
            PV.indexPvCount(id, hits).then(result => {
                next()
            }).catch(err => {
                next(err)
            })
        } else {
            PV.indexPvCount().then(result => {
                next()
            }).catch(err => {
                next(err)
            })
        }
    },
    
    articlePvCount:(req, res, next) => {
        let { id, hits } = req.article
        PV.articlePvCount(id, hits).then(results => {
            next()
        }).catch(err => {
            next(err)
        })
    },
}