const Category  = require('../model/category.js')
module.exports = {
    getList: (req, res, next) => {
        Category.getList().then(results => {
            req.categories = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getCategoryById: (req, res, next) => {
        let id = req.params.id
        Category.getCategoryById(id).then(results => {
            req.category = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getCategoryCount:(req, res, next) => {
        Category.getCategoryCount().then(result => {
            req.categoryCount = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    addCategory: (req, res, next) => {
        let {name, index} = req.body
        Category.addCategory(name, index).then(result => {
            req.insertId = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    delCategory: (req, res, next) => {
        let {id} = req.query
        Category.delCategory(id).then(result => {
            req.affectedRows = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    setName: (req, res, next) => {
        let {id, name} = req.body
        Category.setName(id, name).then(result => {
            req.affectedRows = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    setIndex: (req, res, next) => {
        let {id, index} = req.body
        Category.setIndex(id, index).then(result => {
            req.affectedRows = result
            next()
        }).catch(err => {
            next(err)
        })
    },
}