const Log = require('../model/log')

module.exports = {
    getPage: (req, res, next) => {
        let {p, size} = req.page
        Log.getPage((p - 1) * size, size).then(result => {
            req.page.list = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    getCount: (req, res, next) => {
        Log.getCount().then(result => {
            req.count = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    add: (req, res, next) => {
        Log.add(req.log).then(result => {
            req.affectedRows = result
            next()
        }).catch(err => {
            next(err)
        })
    },
}